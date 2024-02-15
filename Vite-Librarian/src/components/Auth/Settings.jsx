import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.js";
import { deleteUser } from "firebase/auth";
import { onAuthStateChanged, updateEmail, updatePassword } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase.js";
import "./Settings.css";

function Settings() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setEmail(currentUser.email);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      if (user) {
        if (email !== user.email) {
          await updateEmail(user, email);
          alert("Email updated successfully!");
        }
        if (password) {
          await updatePassword(user, password);
          alert("Password updated successfully!");
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the file from the input
    if (!file) return;

    const storageRef = ref(
      storage,
      `profilePictures/${auth.currentUser.uid}/${file.name}`
    );
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!", snapshot);

        // Get the download URL
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImageUrl(downloadURL);

          // Update user profile with the new avatar URL
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          })
            .then(() => {
              console.log("Profile updated successfully");
              // Update local state or context if necessary to reflect the change in the UI
              setAvatarUrl(downloadURL);
            })
            .catch((error) => {
              console.error("Error updating user profile:", error);
            });
        });
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This cannot be undone."
    );

    if (confirmed) {
      const user = auth.currentUser;

      deleteUser(user)
        .then(() => {
          alert("Account deleted successfully.");
          // Redirect to sign-up or home page
          navigate("/signup");
        })
        .catch((error) => {
          if (error.code === "auth/requires-recent-login") {
            // The user must reauthenticate to delete their account
            alert("Please sign in again to delete your account.");
            // Redirect to a re-authentication flow or sign-in page
            navigate("/login");
          } else {
            console.error("Error deleting account:", error);
            alert("An error occurred while attempting to delete the account.");
          }
        });
    }
  };

  return (
    <div className="settings-container">
      <form onSubmit={handleUpdate}>
        <div className="segment">
          <h1>User Settings</h1>
        </div>
        <center>
          {imageUrl && <img src={imageUrl} alt="Uploaded Avatar" />}
        </center>
        {/* {avatarUrl && <img src={avatarUrl} alt="Profile Avatar" />} */}

        <input type="file" onChange={handleFileChange} accept="image/*" />

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          New Password (leave blank to keep current):
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit">Update Settings</button>
        <button className="delete-account" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </form>
    </div>
  );
}

export default Settings;

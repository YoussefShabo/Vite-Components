import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../../firebase.js"; 
import { onAuthStateChanged, updateEmail, updatePassword } from "firebase/auth";


function Settings() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        setUser(currentUser);
        setEmail(currentUser.email);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate])

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
    
      return (
        <div className="settings-container">
          <form onSubmit={handleUpdate}>
            <div className="segment">
              <h1>User Settings</h1>
            </div>
    
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
          </form>
        </div>
      );
    }
    
    export default Settings;
    

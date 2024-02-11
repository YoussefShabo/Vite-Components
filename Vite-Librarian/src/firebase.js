// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8Q3UX0bgfSgaa_4bCfhYZjEwbdMuppTA",
  authDomain: "vite-react-librarian-6fbd2.firebaseapp.com",
  projectId: "vite-react-librarian-6fbd2",
  storageBucket: "vite-react-librarian-6fbd2.appspot.com",
  messagingSenderId: "107178477815",
  appId: "1:107178477815:web:7f334be08a101cc18cabf2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default db;

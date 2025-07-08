// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2Z8Uk99UdR9jT76c1HR1rHiUEJrZBJGg",
  authDomain: "vite-contact-51d9e.firebaseapp.com",
  projectId: "vite-contact-51d9e",
  storageBucket: "vite-contact-51d9e.firebasestorage.app",
  messagingSenderId: "930597644690",
  appId: "1:930597644690:web:1ea1fa17b4f33b0e28f94b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
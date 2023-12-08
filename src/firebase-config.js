// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPTnDLs-8Fk9ah-p8ksrdBavJbndEhtOk",
  authDomain: "encrypted-chat-app-26470.firebaseapp.com",
  projectId: "encrypted-chat-app-26470",
  storageBucket: "encrypted-chat-app-26470.appspot.com",
  messagingSenderId: "113505303325",
  appId: "1:113505303325:web:17da9c8daa7ca44b573ff4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "insta-clone-krish.firebaseapp.com",
  projectId: "insta-clone-krish",
  storageBucket: "insta-clone-krish.appspot.com",
  messagingSenderId: "752502363925",
  appId: "1:752502363925:web:28f33e12babc0dcf2abb1c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
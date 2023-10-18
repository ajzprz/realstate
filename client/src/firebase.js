// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-3ea4c.firebaseapp.com",
  projectId: "mern-estate-3ea4c",
  storageBucket: "mern-estate-3ea4c.appspot.com",
  messagingSenderId: "715230114904",
  appId: "1:715230114904:web:a643c66270237bbf28062d",
  measurementId: "G-NHDZJVRLF3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-_lLs5q2o_yOHTzfw_VWTKTF-P4abpTY",
  authDomain: "ema-john-with-firebase-a-a413d.firebaseapp.com",
  projectId: "ema-john-with-firebase-a-a413d",
  storageBucket: "ema-john-with-firebase-a-a413d.appspot.com",
  messagingSenderId: "286909636934",
  appId: "1:286909636934:web:63c67464381eee75f80547"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app}
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpq_UlImbENiEbaSIgJ_-YUY0EqcLPs6I",
  authDomain: "bubble-a33da.firebaseapp.com",
  projectId: "bubble-a33da",
  storageBucket: "bubble-a33da.appspot.com",
  messagingSenderId: "144562783841",
  appId: "1:144562783841:web:00f173eb387b483bb84c20",
  measurementId: "G-M11F3C7CJM"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
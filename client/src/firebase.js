// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSgviJS68FAcUCFS_zRhj-AzL2DV5gMKw",
  authDomain: "easy-dining-4c644.firebaseapp.com",
  databaseURL: "https://easy-dining-4c644-default-rtdb.firebaseio.com",
  projectId: "easy-dining-4c644",
  storageBucket: "easy-dining-4c644.appspot.com",
  messagingSenderId: "391538831879",
  appId: "1:391538831879:web:8a928d8a2f50c31c6df0a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
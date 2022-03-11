// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeQQvoGjv0_3gmK5NPtg3QSYz3_DxRUtE",
  authDomain: "tracytns-29428.firebaseapp.com",
  projectId: "tracytns-29428",
  storageBucket: "tracytns-29428.appspot.com",
  messagingSenderId: "740896075715",
  appId: "1:740896075715:web:956c06cbffa2b1d780d776",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

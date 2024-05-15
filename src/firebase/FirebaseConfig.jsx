import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtEGMTnRWFs7yBNTuj0Dg1EQTNdHwe6WQ",
  authDomain: "netmarket-b94a0.firebaseapp.com",
  databaseURL:
    "https://netmarket-b94a0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "netmarket-b94a0",
  storageBucket: "netmarket-b94a0.appspot.com",
  messagingSenderId: "444561026880",
  appId: "1:444561026880:web:f5e3f9ea4f5ede4d9154a5",
  measurementId: "G-0CSVDES77J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };

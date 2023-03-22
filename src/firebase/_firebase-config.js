// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
// import * as firebase from 'firebase/app';
// import 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const _firebaseConfig = {
    apiKey: "AIzaSyCBipifBoBHvpG9JK-W2GVo_yP4ttikjFw",
    authDomain: "finalproject-76a75.firebaseapp.com",
    projectId: "finalproject-76a75",
    storageBucket: "finalproject-76a75.appspot.com",
    messagingSenderId: "1029680065873",
    appId: "1:1029680065873:web:fa7d135724a368a75a3770",
    measurementId: "G-0LDG9FDDVN"
};

// Initialize Firebase
const app = initializeApp(_firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
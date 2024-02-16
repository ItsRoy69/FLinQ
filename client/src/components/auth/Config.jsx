
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyC91wKC9eccFwM6jaT09s1CyvkahUxkdpc",
  authDomain: "flinq-14f82.firebaseapp.com",
  projectId: "flinq-14f82",
  storageBucket: "flinq-14f82.appspot.com",
  messagingSenderId: "311371618355",
  appId: "1:311371618355:web:032bee8bcfc699c9426b46",
  measurementId: "G-EE820BPG19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {auth,provider}
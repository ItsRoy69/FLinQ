import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const api_key = import.meta.env.VITE_APP_FIREBASE_API_KEY
const auth_domain = import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN
const projectId = import.meta.env.VITE_APP_FIREBASE_PROJECT_ID
const storageBucket = import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET
const messagingSenderId = import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID
const appId = import.meta.env.VITE_APP_FIREBASE_APP_ID
const measurementId = import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID

const firebaseConfig = {
  apiKey: api_key,
  authDomain: auth_domain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };

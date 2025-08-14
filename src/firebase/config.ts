import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// Make sure to create a .env file with your Firebase config values
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAvynDwtaNqxvzxpm2aObDGLRXxhxQ-biU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "react-login-register-firebase.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "react-login-register-firebase",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "react-login-register-firebase.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "112639451100",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:112639451100:web:d18bbc490c3539f703b919",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-0GV61Q97JP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const analytics = getAnalytics(app);

export default app;

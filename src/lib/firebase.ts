import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; 

const firebaseConfig = {
  apiKey: "AIzaSyDuDxjPniPhb-WySYurUgHCpH6PGJHs164",
  authDomain: "faith-connect-5e5f0.firebaseapp.com",
  projectId: "faith-connect-5e5f0",
  storageBucket: "faith-connect-5e5f0.firebasestorage.app",
  messagingSenderId: "295650543554",
  appId: "1:295650543554:web:e566c31a54c514e819785b",
  measurementId: "G-2H4V0LT829"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Initialize and Export Realtime Database
export const db = getDatabase(app);

export default app;
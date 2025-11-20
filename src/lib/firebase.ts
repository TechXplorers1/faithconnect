// lib/firebase.ts (or wherever your file is located)
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics"; // Analytics often causes issues in SSR, load optionally if needed

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
// 1. Check if apps are already initialized (prevents "App already exists" error)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// 2. Initialize and Export Auth
export const auth = getAuth(app);

// Export app if needed elsewhere
export default app;
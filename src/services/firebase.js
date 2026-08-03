import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCdwgJOD-w-2GNpVgsIQLMFj-CtLfgS-0I",
  authDomain: "event-buddy-5ac4a.firebaseapp.com",
  projectId: "event-buddy-5ac4a",
  storageBucket: "event-buddy-5ac4a.firebasestorage.app",
  messagingSenderId: "641640748058",
  appId: "1:641640748058:web:9677921e6ee586119aada3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google Auth Error:", error.message);
    throw error;
  }
};
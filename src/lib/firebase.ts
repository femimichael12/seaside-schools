import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  User
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyA-GFKSPkf_P4jVmH5YTgizBB0gv9UJI3M",
  authDomain: "seaside-schools.firebaseapp.com",
  projectId: "seaside-schools",
  storageBucket: "seaside-schools.firebasestorage.app",
  messagingSenderId: "592914689680",
  appId: "1:592914689680:web:0654782ea8ea5ad4703215",
  measurementId: "G-B2QXZQ1XHD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Safely initialize Analytics (only in environments that support it)
export let analytics: any = null;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
}).catch((err) => {
  console.warn("Firebase Analytics is not supported in this environment:", err);
});

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Google Sign-In helper
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error("Firebase Google Auth Error:", error);
    throw error;
  }
};

// Sign-Out helper
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error("Firebase Sign-Out Error:", error);
    throw error;
  }
};

export { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile };
export type { User };

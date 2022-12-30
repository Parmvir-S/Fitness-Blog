import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// Fitness Blog's Firebase Configuration
const firebaseConfig = {
  apiKey: dev.env.apiKey,
  authDomain: dev.env.authDomain,
  projectId: dev.env.projectId,
  storageBucket: dev.env.storageBucket,
  messagingSenderId: dev.env.messagingSenderId,
  appId: dev.env.appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
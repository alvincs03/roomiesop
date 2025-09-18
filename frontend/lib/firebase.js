import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
// You'll need to replace these with your actual Firebase config values
const firebaseConfig = {
    apiKey: "AIzaSyBx5KjCCd-5NFua_hsA2ah7tRwfgwTszbA",
    authDomain: "roomies-op.firebaseapp.com",
    projectId: "roomies-op",
    storageBucket: "roomies-op.firebasestorage.app",
    messagingSenderId: "266899287086",
    appId: "1:266899287086:web:439ba0f8f77487ca0b43bf",
    measurementId: "G-X86G9DMF00"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;

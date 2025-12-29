// Firebase Client Configuration (Browser-side)
// This file initializes Firebase for client-side operations (Auth, Firestore listeners)

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only once (singleton pattern)
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

// Check if Firebase is configured (all env vars present)
const isFirebaseConfigured = Object.values(firebaseConfig).every(val => val !== undefined);

if (isFirebaseConfigured) {
    // Only initialize if not already initialized
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApps()[0];
    }

    auth = getAuth(app);
    db = getFirestore(app);
} else {
    console.warn('[Firebase] Client configuration missing. Running in offline mode.');
}

export { app, auth, db, isFirebaseConfigured };

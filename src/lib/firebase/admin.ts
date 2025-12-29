// Firebase Admin SDK Configuration (Server-side)
// Used in API routes and server components for secure operations

import { initializeApp, cert, getApps, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';

let adminApp: App;
let adminDb: Firestore;
let adminAuth: Auth;

// Check if Firebase Admin is configured
const isAdminConfigured =
    process.env.FIREBASE_ADMIN_PROJECT_ID &&
    process.env.FIREBASE_ADMIN_CLIENT_EMAIL &&
    process.env.FIREBASE_ADMIN_PRIVATE_KEY;

if (isAdminConfigured) {
    // Initialize Firebase Admin only once
    if (!getApps().length) {
        adminApp = initializeApp({
            credential: cert({
                projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
                clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
                // Private key needs newline replacement from env
                privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            }),
        });
    } else {
        adminApp = getApps()[0];
    }

    adminDb = getFirestore(adminApp);
    adminAuth = getAuth(adminApp);
} else {
    console.warn('[Firebase Admin] Configuration missing. Some server features will be disabled.');
}

export { adminApp, adminDb, adminAuth, isAdminConfigured };

# 🚀 Vercel Production Setup

To make the live site work, you need to add the Firebase keys to Vercel.

## 1. Go to Vercel Dashboard
1. Open your project in Vercel.
2. Click **Settings** (top tab).
3. Click **Environment Variables** (left sidebar).

## 2. Add These Variables
Copy and paste these exact values (I prepared them from your config):

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyA9TOKuprl3I56yvSWVCBQoYuz5r2pAp5c` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `off-radar-18a78.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `off-radar-18a78` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `off-radar-18a78.firebasestorage.app` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `997127125648` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:997127125648:web:8029b28dad56a6c05c3615` |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | `G-9WZMM3GFH5` |

## 3. Redeploy
After adding the variables:
1. Go to **Deployments** tab.
2. Click the three dots `...` on the latest deployment.
3. Click **Redeploy**.

**Once verified, your live site will have full Google Sign-In!**

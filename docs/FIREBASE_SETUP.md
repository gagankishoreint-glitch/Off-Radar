# Firebase & Google Cloud Setup Guide

This guide will help you set up Firebase and Google Cloud Platform to enable AI features in Off-Radar.

## Prerequisites
- Google Account
- Credit card (for GCP, but you can stay within free tier)

---

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `off-radar` (or your preferred name)
4. Disable Google Analytics (optional for this project)
5. Click **"Create project"**

---

## Step 2: Get Firebase Client Configuration

1. In Firebase Console, click the **gear icon** ⚙️ → **Project settings**
2. Scroll to **"Your apps"** section
3. Click the **Web icon** `</>`
4. Register app with nickname: `Off-Radar Web`
5. Copy the `firebaseConfig` object values to `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

---

## Step 3: Enable Firestore Database

1. In Firebase Console, go to **Firestore Database** (left sidebar)
2. Click **"Create database"**
3. Choose **"Start in test mode"** (we'll secure it later)
4. Select location: `us-central` or closest to you
5. Click **"Enable"**

---

## Step 4: Enable Authentication

1. In Firebase Console, go to **Authentication** (left sidebar)
2. Click **"Get started"**
3. Enable **Email/Password** provider:
   - Click it → Toggle **"Enable"** → Save
4. Enable **Google** provider:
   - Click it → Toggle **"Enable"**
   - Enter support email → Save

---

## Step 5: Get Firebase Admin SDK Credentials

1. In Firebase Console → **Project settings** → **Service accounts** tab
2. Click **"Generate new private key"**
3. Download the JSON file (keep it **SECURE**)
4. Open the JSON file and extract these values to `.env.local`:

```env
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Key-Here\n-----END PRIVATE KEY-----\n"
```

⚠️ **Important**: For the private key, copy the entire key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`, and wrap it in double quotes. Keep the `\n` characters as-is.

---

## Step 6: Enable Google Cloud Vertex AI

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project from the dropdown
3. Enable billing:
   - Go to **Billing** → Link a billing account
   - Don't worry - Vertex AI has a free tier!
4. Enable Vertex AI API:
   - Go to **APIs & Services** → **Library**
   - Search for "Vertex AI API"
   - Click **"Enable"**
5. Add to `.env.local`:

```env
GCP_PROJECT_ID=your-project-id
GCP_LOCATION=us-central1
VERTEX_AI_MODEL=gemini-2.0-flash-exp
```

---

## Step 7: Configure Firestore Security Rules

1. In Firebase Console → **Firestore Database** → **Rules** tab
2. Replace with these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }
    
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if isOwner(userId);
    }
    
    match /resumes/{resumeId} {
      allow read, write: if isOwner(resource.data.userId);
    }
    
    match /offers/{offerId} {
      allow read, write: if isOwner(resource.data.userId);
    }
    
    match /chat_sessions/{sessionId} {
      allow read, write: if isOwner(resource.data.userId);
    }
    
    // Workspace pages and blocks (existing)
    match /pages/{pageId} {
      allow read: if true; // Public read for demo
      allow write: if isSignedIn();
    }
    
    match /blocks/{blockId} {
      allow read: if true;
      allow write: if isSignedIn();
    }
  }
}
```

3. Click **"Publish"**

---

## Step 8: Test Your Setup

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in all the values from steps above

3. Start the dev server:
   ```bash
   npm run dev
   ```

4. Check the browser console:
   - No Firebase errors = ✅ Success!
   - Look for: `[Firebase] Client initialized successfully`
   - Look for: `[Gemini] Client initialized successfully`

---

## Step 9: Verify AI Features

Test the AI endpoints:

### Test Resume Analysis
```bash
curl -X POST http://localhost:3000/api/ai/analyze-resume \
  -H "Content-Type: application/json" \
  -d '{"resumeText": "Software Engineer with 3 years experience in React and Node.js..."}'
```

### Test Career Chat
```bash
curl -X POST http://localhost:3000/api/ai/career-chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Should I take a Google internship or a startup role?"}'
```

If you get JSON responses (not errors), AI is working! 🎉

---

## Troubleshooting

### "Firebase client not configured"
- Check that all `NEXT_PUBLIC_FIREBASE_*` vars are set in `.env.local`
- Restart dev server after adding env vars

### "Gemini client not configured"
- Verify Vertex AI API is enabled in GCP
- Check `GCP_PROJECT_ID` matches your Firebase project ID
- Ensure billing is enabled (required for Vertex AI)

### "Permission denied" in Firestore
- Check Firestore rules are published
- Verify user is authenticated before accessing data

### Build errors
- Run `npm install` to ensure dependencies are installed
- Clear `.next` folder: `rm -rf .next` then rebuild

---

## Cost Management

### Free Tier Limits (Monthly)
- **Firestore**: 1GB storage, 50K reads, 20K writes, 20K deletes
- **Vertex AI (Gemini)**: ~$0.10 for 100K characters
- **Cloud Functions**: 2M invocations

### Staying Within Free Tier
- For a student project with moderate usage (100-500 users):
  - Expected cost: **$0-5/month**
- Set up billing alerts in GCP Console at $5, $10, $20

---

## Next Steps

Once setup is complete:
1. ✅ Test AI features in the app
2. ✅ Sign up and create a user account
3. ✅ Upload a resume and get AI analysis
4. ✅ Create offers and get AI comparison
5. ✅ Try the career chatbot

**Optional Enhancements:**
- Deploy Cloud Functions for background processing
- Set up email notifications
- Add analytics with BigQuery
- Implement premium features (paid plan)

---

## Support

If you encounter issues:
1. Check browser console for errors
2. Check server logs (`npm run dev` output)
3. Verify environment variables are set correctly
4. Ensure APIs are enabled in GCP Console

For Firebase issues, see [Firebase Docs](https://firebase.google.com/docs)
For Vertex AI issues, see [Vertex AI Docs](https://cloud.google.com/vertex-ai/docs)

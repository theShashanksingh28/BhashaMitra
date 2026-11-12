# BhashaMitra (भाषामित्र)

An interactive web app for learning India's 22 official languages, with staged lessons, progress tracking, and Firebase-backed accounts.

## Features

- Catalog of all 22 official Indian languages with staged levels and a Hindi Foundation track (10 levels)
- Email/password authentication; each account gets a profile, progress, and achievements document in Firestore
- Dashboard with progress, streak, and activity summaries; profile, certificates, and badges pages
- Responsive Tailwind/shadcn-ui interface, SPA routing with a 404 fallback

## Tech stack

- React 18 + Vite 6 (JSX with some TypeScript files)
- Tailwind CSS 3 with shadcn/ui components on Radix primitives
- react-router-dom v6 (BrowserRouter)
- Firebase 11: Authentication, Firestore, Analytics
- framer-motion, recharts, sonner

## Prerequisites

- Node.js 18 or newer (Netlify builds pin Node 18)
- npm
- A Firebase project (free Spark plan is enough)

## Getting started

```bash
git clone https://github.com/theShashanksingh28/BhashaMitra.git
cd BhashaMitra
npm install
cp .env.example .env   # Windows: copy .env.example .env
```

Fill `.env` with the web app config from Firebase (Project settings > Your apps):

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

Then start the dev server:

```bash
npm run dev
```

The app runs at http://localhost:8080. Vite reads env files at startup, so restart the server after editing `.env`. The app throws a clear error if `apiKey`, `authDomain`, `projectId`, or `appId` is missing.

## Firebase setup

1. Create a project at https://console.firebase.google.com, then add a Web app and copy the config values into `.env`.
2. Authentication > Sign-in method > enable **Email/Password**.
3. Firestore Database > Create database (production mode, pick a region close to you).
4. Publish security rules (starting point; test in the Rules Playground before relying on them):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
    match /userProgress/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
    match /achievements/{docId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow write: if request.auth != null && request.auth.uid == docId;
    }
    match /levels/{docId} {
      allow read: if request.auth != null;
    }
    match /activities/{docId} {
      allow read: if request.auth != null;
    }
    match /test/{docId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

5. Authentication > Settings > Authorized domains: add your deployment domain (e.g. `your-site.netlify.app`). `localhost` is authorized by default.

Collections written by the app: `users`, `userProgress`, `achievements`. `levels` and `activities` are content collections the dashboard reads from; the dashboard renders without them but shows no course content until they are populated.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server on port 8080 |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm run generate-levels` | Regenerate level content from `scripts/generateLevels.js` |

## Deployment (Netlify)

`netlify.toml` already sets the build command (`npm run build`), publish directory (`dist`), Node 18, and the SPA redirect.

1. Connect the repository in Netlify.
2. Add every `VITE_FIREBASE_*` variable under Site configuration > Environment variables. They are baked in at build time, so redeploy after changing them.
3. Add the Netlify domain to Firebase Authentication > Authorized domains.

## Routes

Public: `/`, `/features`, `/benefits`, `/about`, `/learn-more`, `/languages`, `/login`, `/signup`

Authenticated: `/native-language`, `/language-selection`, `/languages/:language`, `/languages/:language/:stage/levels`, `/languages/Hindi/Foundation/level1`–`level10`, `/languages/:language/:stage/level:levelNumber`, `/dashboard`, `/profile`, `/certificates`, `/badges`

Anything else renders the 404 page.

## Project structure

```
src/
  components/      UI components, auth forms, Navbar/Footer, shadcn/ui primitives
  contexts/        AuthContext and LanguageContext providers
  data/            Language catalog and level content
  lib/             Firebase initialization and utils
  pages/           Route pages, including pages/languages/* level screens
  utils/           Helpers such as auth error messages
public/            Static assets
scripts/           Level generation script
```

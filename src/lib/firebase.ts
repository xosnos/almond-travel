import { initializeApp, getApps, FirebaseApp } from "firebase/app";
// import { getAnalytics, logEvent } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

// Initialize Firebase only on client side to avoid errors during static generation
let app: FirebaseApp;
let auth: Auth;
let providerGoogle: GoogleAuthProvider;
let db: Firestore;

if (typeof window !== 'undefined') {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
  providerGoogle = new GoogleAuthProvider();
  db = getFirestore(app);
} else {
  // Server-side placeholders - these won't be used during SSR
  app = null as any;
  auth = null as any;
  providerGoogle = null as any;
  db = null as any;
}

// const analytics = getAnalytics(app);
// logEvent(analytics, "event logged");
export { auth, providerGoogle, db };
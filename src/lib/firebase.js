import { initializeApp } from "firebase/app";
// import { getAnalytics, logEvent } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// logEvent(analytics, "event logged");
export const auth = getAuth(app);
export const providerGoogle = new GoogleAuthProvider();
export const db = getFirestore(app);
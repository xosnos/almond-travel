import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4gtoqMo1VQM4L9ZOBL5UM20gHeQGu24Q",
  authDomain: "almond-travel.firebaseapp.com",
  projectId: "almond-travel",
  storageBucket: "almond-travel.appspot.com",
  messagingSenderId: "308439850754",
  appId: "1:308439850754:web:b258ba6929ccf2ff2c6c1b",
  measurementId: "G-EZYNEN3K4C"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const providerGoogle = new GoogleAuthProvider();
export const db = getFirestore(app);
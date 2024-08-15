// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_LAUNCH_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_LAUNCH_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_LAUNCH_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_LAUNCH_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_LAUNCH_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_LAUNCH_APPID,
  measurementId: process.env.NEXT_PUBLIC_LAUNCH_MEASUREMENTID
};

// Initialize Firebase
export const app = typeof window !== 'undefined' && (getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0])
// export const analytics = app && getAnalytics(app);

export const projectId = firebaseConfig.projectId

export default app

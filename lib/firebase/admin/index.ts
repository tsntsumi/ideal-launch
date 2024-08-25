import "server-only"

import admin from "firebase-admin"
import { initializeFirestore } from 'firebase-admin/firestore'
 
interface FirebaseAdminAppParams {
  projectId: string
  clientEmail: string
  storageBucket: string
  privateKey: string
}
 
function formatPrivateKey(key: string) {
  return key.replace(/\\n/g, "\n")
}
 
export function createFirebaseAdminApp(params: FirebaseAdminAppParams) {
  const privateKey = formatPrivateKey(params.privateKey)
 
  if (admin.apps.length > 0) {
    return admin.app()
  }
 
  const cert = admin.credential.cert({
    projectId: params.projectId,
    clientEmail: params.clientEmail,
    privateKey,
  })
 
  const app = admin.initializeApp({
    credential: cert,
    projectId: params.projectId,
    storageBucket: params.storageBucket,
  })
  admin.firestore().settings({ignoreUndefinedProperties:true});
  return app
}

export async function initAdmin() {
  const params = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
    privateKey: process.env.FIREBASE_PRIVATE_KEY as string,

    apiKey: process.env.NEXT_PUBLIC_LAUNCH_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_LAUNCH_AUTHDOMAIN,
    messagingSenderId: process.env.NEXT_PUBLIC_LAUNCH_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_LAUNCH_APPID,
    measurementId: process.env.NEXT_PUBLIC_LAUNCH_MEASUREMENTID
  }

  return createFirebaseAdminApp(params)
}

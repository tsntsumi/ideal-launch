"use client";

import { FC, ReactNode, useMemo } from "react";
import {
  AnalyticsProvider,
  AuthProvider,
  FirebaseAppProvider,
  FirestoreProvider,
  StorageProvider,
  useFirebaseApp,
} from "reactfire";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { isBrowser } from "@/lib/utils";
import { getAnalytics } from "firebase/analytics";
import { FirebaseOptions } from "firebase/app";

const config: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_LAUNCH_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_LAUNCH_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_LAUNCH_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_LAUNCH_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_LAUNCH_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_LAUNCH_APPID,
  measurementId: process.env.NEXT_PUBLIC_LAUNCH_MEASUREMENTID
};

const FirebaseProviderSDKs: FC<{ children: ReactNode }> = ({ children }) => {
  const firebase = useFirebaseApp();
  // we have to use getters to pass to providers, children should use hooks
  const auth = useMemo(() => getAuth(), []);
  const firestore = useMemo(() => getFirestore(firebase), []);
  const storage = useMemo(() => getStorage(firebase), [])
  const analytics = useMemo(() => isBrowser() && getAnalytics(firebase), []);

  return (
    <>
    {auth && (
      <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>
      <StorageProvider sdk={storage}>
      {/* we can only use analytics in the browser */}
        {analytics ? (
          <AnalyticsProvider sdk={analytics}>{children}</AnalyticsProvider>
        ) : (
          <>{children}</>
        )}
      </StorageProvider>
      </FirestoreProvider>
      </AuthProvider>
    )}
    </>
  );
};

export const MyFirebaseProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <FirebaseAppProvider firebaseConfig={config}>
        <FirebaseProviderSDKs>{children}</FirebaseProviderSDKs>
      </FirebaseAppProvider>
    </>
  );
};

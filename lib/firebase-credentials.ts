export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyBc2W6_qEq00w9oJPYyv5C4vWiaNibMaOs",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "dprinting-ac506.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "dprinting-ac506",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "dprinting-ac506.firebasestorage.app",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "468783961077",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:468783961077:web:e561a8998d2d05c9a4c6bc",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "G-62489KWDKJ",
};

// Keep auth bypass enabled in local/dev until real credentials and rules are set.
export const adminBypassEnabled =
  process.env.NEXT_PUBLIC_ADMIN_BYPASS_AUTH !== "false";


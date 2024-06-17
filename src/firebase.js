import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCErV8hzyhqEoOu0FlWKEUZu_yef9UQoq4",
  authDomain: "uploadcabeloeart.firebaseapp.com",
  projectId: "uploadcabeloeart",
  storageBucket: "uploadcabeloeart.appspot.com",
  messagingSenderId: "952830162641",
  appId: "1:952830162641:web:45220171affd22ae0c37f0",
  measurementId: "G-9XR3WJWP71"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
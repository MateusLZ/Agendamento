import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVIU1Yzja1QA6uyAm9s7m0jsU3ldxUgiE",
  authDomain: "reactupload-bbaac.firebaseapp.com",
  projectId: "reactupload-bbaac",
  storageBucket: "reactupload-bbaac.appspot.com",
  messagingSenderId: "715169481138",
  appId: "1:715169481138:web:735ecc3090e6b8bbe164ab",
  measurementId: "G-ZEFV25KYB2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const  storage = getStorage(app)


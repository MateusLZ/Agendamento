import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyD_c62R0yXyhMOGJwEmGAbNmjU2jy48va0",
  authDomain: "uploadssenai.firebaseapp.com",
  projectId: "uploadssenai",
  storageBucket: "uploadssenai.appspot.com",
  messagingSenderId: "245367261648",
  appId: "1:245367261648:web:7d8f7066697fe9ec4ed1d5"
};

export const app = initializeApp(firebaseConfig);
export const  storage =getStorage(app)
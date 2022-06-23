import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMmw0kYTmWCDjGC6FVy73M9LnM3OAXxIA",
  authDomain: "suwaseriya001.firebaseapp.com",
  databaseURL: "https://suwaseriya001-default-rtdb.firebaseio.com",
  projectId: "suwaseriya001",
  storageBucket: "suwaseriya001.appspot.com",
  messagingSenderId: "804067600547",
  appId: "1:804067600547:web:262f7cc6c592e166653716",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFirestore }  from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBXryiYDaXzxHM-2T5107fxMxZUIpqkXz0",
  authDomain: "forksure-3beee.firebaseapp.com",
  databaseURL: "https://forksure-3beee-default-rtdb.firebaseio.com",
  projectId: "forksure-3beee",
  storageBucket: "forksure-3beee.firebasestorage.app",
  messagingSenderId: "183734759333",
  appId: "1:183734759333:web:bceef85868967db848424c",
  measurementId: "G-L6BC513ZEQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);

export {
  analytics,
  auth, 
  database,
  firestore,
  storage,
};
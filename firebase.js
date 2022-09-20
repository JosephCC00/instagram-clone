// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgYHJu3oogIouiqwBap-1iSykiikSON8A",
  authDomain: "insta-2-yt-b368c.firebaseapp.com",
  projectId: "insta-2-yt-b368c",
  storageBucket: "insta-2-yt-b368c.appspot.com",
  messagingSenderId: "1024349677202",
  appId: "1:1024349677202:web:8f1834601af4f5f93b284b",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();

const storage = getStorage();

export { app, db, storage };

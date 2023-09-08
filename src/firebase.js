// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEMLq_GAatS3MSJLNHiDj3qiytLWIQoQ4",
  authDomain: "web-projekt-9f2c3.firebaseapp.com",
  projectId: "web-projekt-9f2c3",
  storageBucket: "web-projekt-9f2c3.appspot.com",
  messagingSenderId: "619095593512",
  appId: "1:619095593512:web:14483210321352f6a05b1d",
  measurementId: "G-DEQL44KHSN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
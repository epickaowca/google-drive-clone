import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPPkIxgzXFVJzXUeVxjg4uXzvAWUWJSmI",
  authDomain: "drive-clone-42a8f.firebaseapp.com",
  projectId: "drive-clone-42a8f",
  storageBucket: "drive-clone-42a8f.appspot.com",
  messagingSenderId: "173028159850",
  appId: "1:173028159850:web:19e725ece636bb4794b513",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage();

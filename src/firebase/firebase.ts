import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnWGQRrCUn3hZclUJ9185WmeEr3z-kGOk",
  authDomain: "students-assignment-730e2.firebaseapp.com",
  projectId: "students-assignment-730e2",
  storageBucket: "students-assignment-730e2.firebasestorage.app",
  messagingSenderId: "652666548080",
  appId: "1:652666548080:web:6933578dc4afa9113169b5",
  measurementId: "G-8JMLD9N3ZE",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

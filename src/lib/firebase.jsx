import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCX_pNeNmFa79UwetPZ4fIAcgzoKb_R9rM",
  authDomain: "react-chat-app-49630.firebaseapp.com",
  projectId: "react-chat-app-49630",
  storageBucket: "react-chat-app-49630.appspot.com",
  messagingSenderId: "18835669123",
  appId: "1:18835669123:web:410005e10b5e7657c55bb6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore();

export default app;


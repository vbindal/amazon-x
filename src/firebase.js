// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc,collection,addDoc,query, orderBy, onSnapshot } from "firebase/firestore"; 


const firebaseConfig = {
  apiKey: "AIzaSyBUaCQH_4ijZhC70hbJff4xIrmSGQwpLrw",
  authDomain: "clone-70418.firebaseapp.com",
  projectId: "clone-70418",
  storageBucket: "clone-70418.appspot.com",
  messagingSenderId: "636157212862",
  appId: "1:636157212862:web:26fc9486301fc8a0e6c6ef",
  measurementId: "G-NV1Q80WP8B"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth  = getAuth();

export {auth,db,createUserWithEmailAndPassword,signInWithEmailAndPassword,doc,setDoc,collection,addDoc,query, orderBy, onSnapshot};

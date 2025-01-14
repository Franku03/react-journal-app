// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpPH7B2ZTaIXloaenYoq2-Y7tX_AC8b_s",
  authDomain: "react-cursos-f2391.firebaseapp.com",
  projectId: "react-cursos-f2391",
  storageBucket: "react-cursos-f2391.firebasestorage.app",
  messagingSenderId: "967169100176",
  appId: "1:967169100176:web:bb5f0fe5199bfe06af0b15"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp )


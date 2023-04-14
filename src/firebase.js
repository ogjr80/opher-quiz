

// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const config = {
  apiKey: "AIzaSyBgv2Fq_R4UZi9L4U7-DPKX-XEhfZOPdhQ",
  authDomain: "morgue-app.firebaseapp.com",
  projectId: "morgue-app",
  storageBucket: "morgue-app.appspot.com",
  messagingSenderId: "836259835418",
  appId: "1:836259835418:web:3d5a56aefc24ab7681eba3"
};


const app = initializeApp(config);
export const firestore = getFirestore(app);

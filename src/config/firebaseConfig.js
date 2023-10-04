import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDedcqc3kajuCE9HJjisUzryz8lhKLs874",
  authDomain: "va-ad-bayit.firebaseapp.com",
  projectId: "va-ad-bayit",
  storageBucket: "va-ad-bayit.appspot.com",
  messagingSenderId: "678454354829",
  appId: "1:678454354829:web:75b9c144213ce3d99553c4",
  measurementId: "G-GVELKG9CWB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
    app, auth, db
}
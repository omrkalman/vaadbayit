import './App.css';
import SignIn from './components/SignIn/SignIn';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDedcqc3kajuCE9HJjisUzryz8lhKLs874",
  authDomain: "va-ad-bayit.firebaseapp.com",
  projectId: "va-ad-bayit",
  storageBucket: "va-ad-bayit.appspot.com",
  messagingSenderId: "678454354829",
  appId: "1:678454354829:web:75b9c144213ce3d99553c4",
  measurementId: "G-GVELKG9CWB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  return (
    <SignIn auth={auth}>Word</SignIn>
  );
}

export default App

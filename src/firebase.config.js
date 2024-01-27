import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqjl6Ya4JRwODNTJRvlx8tWeE3Kx_0j2M",
  authDomain: "quiz-app-hs.firebaseapp.com",
  projectId: "quiz-app-hs",
  storageBucket: "quiz-app-hs.appspot.com",
  messagingSenderId: "269034180324",
  appId: "1:269034180324:web:5454805b2875534894e6f1",
  measurementId: "G-PXP2MZZ6NL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

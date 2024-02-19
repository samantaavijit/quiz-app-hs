import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnlRFFnROFk4f_gfQsBBwiYf8Z6w7DPFQ",
  authDomain: "avijitsamanta-class12.firebaseapp.com",
  projectId: "avijitsamanta-class12",
  storageBucket: "avijitsamanta-class12.appspot.com",
  messagingSenderId: "822484338282",
  appId: "1:822484338282:web:86d581e6f0bd049d5c2c13",
  measurementId: "G-4391EW9Y03",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;

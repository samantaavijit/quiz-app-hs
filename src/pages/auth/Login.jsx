import React, { useEffect, useState } from "react";
import Loader from "../../utils/loader/Loader";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase.config";
import "./login.css";

export default function Login() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (result) => {
      if (result) {
        // console.log(result);

        const { displayName, email, photoURL, stsTokenManager } = result;

        // console.log(displayName, email, photoURL, stsTokenManager);
        // setUserData({ displayName, email });

        // setIsLoggedIn(true);
      } else {
        // setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const SignUpUsingGoogle = () => {
    const provider = new GoogleAuthProvider();
    // provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    // provider.addScope("https://www.googleapis.com/auth/user.phonenumbers.read");
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email, photoURL, stsTokenManager } = result.user;
        console.log(displayName, email, photoURL, stsTokenManager);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (
    <div>
      {loading && <Loader />}

      <h1>Login / Registration</h1>

      <button
        onClick={SignUpUsingGoogle}
        type="button"
        className="login-with-google-btn mt-5"
      >
        Sign in with Google
      </button>
    </div>
  );
}

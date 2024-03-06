import React, { useEffect, useState } from "react";
import Loader from "../../utils/loader/Loader";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase.config";
import "./login.css";
import axios from "../../utils/helpers/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const SignUpUsingGoogle = () => {
    setLoading(true);

    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/user.phonenumbers.read");
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;

        const formData = {
          email,
          name: displayName,
          avatar: photoURL,
        };

        axios
          .post("/auth/login", formData)
          .then((res) => {
            setLoading(false);

            if (res.data.success) {
              if (res.data.inReview) {
                toast.error(res.data.message);
              } else {
                toast.success(res.data.message);

                let { token, userDetails } = res.data;
                localStorage.setItem("token", token);
                localStorage.setItem(
                  "userDetails",
                  JSON.stringify(userDetails)
                );
                navigate("/dashboard");
              }
            } else {
              toast.error(res.data.message);
            }
          })
          .catch((err) => {
            setLoading(false);
            console.error(err);
            toast.error("Something Went Wrong!!");
          });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (
    <div className="my-5 py-5">
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

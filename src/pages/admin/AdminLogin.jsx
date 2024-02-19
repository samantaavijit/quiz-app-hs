import React, { useState } from "react";
import "./admin.css";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import Loader from "../../utils/loader/Loader";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    let { name, value } = e.target;

    userData[name] = value;

    setUserData({ ...userData });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    let { email, password } = userData;

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setLoading(false);
        const { idToken } = res._tokenResponse;
        const token = idToken;
        localStorage.setItem("admin_token", token);
        localStorage.setItem(
          "admin_details",
          JSON.stringify(res._tokenResponse)
        );
        navigate("/admin/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.message;
        console.error(errorMessage);
        toast.error(errorMessage);
      });
  };

  return (
    <div className="fullscreen">
      {loading && <Loader />}
      <div className="centered-3d">
        <Form onSubmit={onSubmit}>
          <h1>Admin Login</h1>

          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              name="email"
              type="email"
              value={userData.email}
              placeholder="name@example.com"
              onChange={handleOnChange}
              required
            />
          </FloatingLabel>

          <FloatingLabel
            className="mb-3"
            controlId="floatingPassword"
            label="Password"
          >
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleOnChange}
              required
              value={userData.password}
            />
          </FloatingLabel>
          <Button type="submit">Login</Button>
        </Form>
      </div>
    </div>
  );
}

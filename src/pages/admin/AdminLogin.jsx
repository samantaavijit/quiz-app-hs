import React, { useEffect, useState } from "react";
import "./admin.css";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import Loader from "../../utils/loader/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/helpers/axios";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("admin_token")) {
      navigate("/admin/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = (e) => {
    let { name, value } = e.target;

    userData[name] = value;

    setUserData({ ...userData });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    axios
      .post("/auth/admin-login", userData)
      // .post("/auth/admin-signup", userData)
      .then((res) => {
        setLoading(false);

        if (res.data.success) {
          toast.success(res.data.message);
          let { token, userDetails } = res.data;
          localStorage.setItem("admin_token", token);
          localStorage.setItem("admin_details", JSON.stringify(userDetails));
          window.location.reload();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        toast.error("Something Went Wrong!!");
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

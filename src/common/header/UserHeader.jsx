import React, { useEffect, useState } from "react";
import "./header.css";
import { Navbar, Container, Nav, NavDropdown, Image } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

export default function UserHeader() {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    let userDetails = localStorage.getItem("userDetails");

    if (userDetails) {
      userDetails = JSON.parse(userDetails);
      setUserDetails(userDetails);
    }
  }, []);

  const handleLogout = () => {
    const aa = toast.loading("Please Wait");

    setTimeout(() => {
      localStorage.clear();
      window.location.pathname = "/";
      toast.done(aa);
    }, 1500);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/dashboard">
          <img
            src="https://avatars.githubusercontent.com/u/67010969?v=4"
            height="30"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/dashboard" exact={`${true}`}>
              Home
            </NavLink>
            <NavLink
              className="nav-link"
              to="/show-quiz-topic"
              exact={`${true}`}
            >
              Quiz
            </NavLink>
            {/* <NavLink className="nav-link" to="/mock-test" exact={`${true}`}>
              Mock Test
            </NavLink> */}
            <NavLink className="nav-link" to="/transaction" exact={`${true}`}>
              Payment
            </NavLink>
          </Nav>
          <Nav>
            {localStorage.getItem("token") ? (
              <NavDropdown
                title={
                  <>
                    {userDetails.name}
                    <Image
                      src={userDetails.avatar}
                      roundedCircle
                      width="30"
                      height="30"
                      className="ms-2"
                    />
                  </>
                }
                id="basic-nav-dropdown"
              >
                <NavLink className="dropdown-item" to="/profile">
                  <i className="fas fa-user" /> Profile
                </NavLink>
                <NavLink className="dropdown-item" to="/dashboard">
                  <i className="fas fa-cog" /> Dashboard
                </NavLink>

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt" /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link to="/" type="button" className="btn btn-primary">
                Login
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

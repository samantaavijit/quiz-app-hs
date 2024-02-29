import React, { useState } from "react";
import "./header.css";
import { Navbar, Container, Nav, NavDropdown, Image } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

export default function UserHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to true for testing
  const [userName, setUserName] = useState("John Doe"); // User's name

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
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
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <NavDropdown
                title={
                  <>
                    {userName}
                    <Image
                      src="https://avatars.githubusercontent.com/u/67010969?v=4"
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

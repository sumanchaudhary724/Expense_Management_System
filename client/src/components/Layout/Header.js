import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  });
  return (
    <>
      {" "}
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary navbar">
        <Container>
          <Navbar.Brand href="/">Expense Management</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/register">User Register</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav>
                <p>{loginUser && loginUser.name}</p>
              </Nav>
              <button
                className="btn btn-primary"
                onClick={() => localStorage.removeItem("user")}
              >
                Logout
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

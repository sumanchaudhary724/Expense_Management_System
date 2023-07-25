import { message } from "antd";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };
  return (
    <>
      {" "}
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary navbar">
        <Container>
          <Navbar.Brand href="/">Expense Management</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              {/* <Nav.Link href="/register">User Register</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link> */}
              <Nav.Link>
                <p>{loginUser && loginUser.name}</p>
              </Nav.Link>
              <Nav.Link>
                {" "}
                <button className="btn btn-primary" onClick={logoutHandler}>
                  Logout
                </button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

import React from "react";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import applogo from "../images/applogo.png";
import { Button } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";


const NavbarComp = ({ isAuth, setIsAuth}) => {
  const signOutUser = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Image
            style={{ width: "3.5%", marginRight: "2%" }}
            src={applogo}
            roundedCircle
          />
          <Navbar.Brand href="/">Fitness Blog</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>

            {!isAuth ? (
              <Nav.Link href="/login">Login</Nav.Link>
            ) : (
              <>
              <Nav.Link href="/createpost">Create Post</Nav.Link>
              <Button style={{transform: "scale(0.85)"}} onClick={signOutUser}>Sign Out</Button>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComp;

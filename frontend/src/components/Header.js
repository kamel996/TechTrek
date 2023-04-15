import React from "react";
import { Container } from "react-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
function Header() {
  return (
    <Container>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Container>
            <Navbar.Brand href="#home">E-commerce</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto" style={{ marginLeft: "55rem" }}>
                <Nav.Link href="#home">
                  <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Link>
                <Nav.Link href="#link">
                  <i className="fas fa-user"></i>Sign In
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </Container>
  );
}

export default Header;

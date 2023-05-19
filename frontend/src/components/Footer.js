import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container className="text-center py-3">
        <p>
          {" "}
          &copy;
          <strong>2023 Kamel's Ecommerce. All rights reserved.</strong>{" "}
        </p>
      </Container>
    </footer>
  );
};

export default Footer;

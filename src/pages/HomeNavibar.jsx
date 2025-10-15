import React from "react";
import { Navbar, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const HomeNavibar = ({ systemName }) => {
  return (
    <Navbar bg="primary" variant="dark" className="shadow">
      <Container className="justify-content-center">
        <Navbar.Brand className="mx-auto text-center fw-bold fs-5">
          {systemName}
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default HomeNavibar;

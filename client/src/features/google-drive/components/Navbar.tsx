import { FC } from "react";
import { Navbar as NavbarBS, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Navbar: FC = () => {
  return (
    <NavbarBS bg="light">
      <Container>
        <NavbarBS.Brand as={Link} to="/">
          OWCA Drive
        </NavbarBS.Brand>
        <Nav>
          <Nav.Link as={Link} to="/user">
            Profile
          </Nav.Link>
        </Nav>
      </Container>
    </NavbarBS>
  );
};

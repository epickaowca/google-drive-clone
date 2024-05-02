import { FC } from "react";
import { Navbar as NavbarBS, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "@root/hooks/useAuth";

export const Navbar: FC = () => {
  const { email } = useAuth();
  return (
    <NavbarBS bg="light">
      <Container>
        <NavbarBS.Brand as={Link} to="/">
          {email}
        </NavbarBS.Brand>
        <Nav>
          <Nav.Link as={Link} to="/profile" className="fs-5">
            Profile
          </Nav.Link>
        </Nav>
      </Container>
    </NavbarBS>
  );
};

import { FC } from "react";
import { Navbar as NavbarBS, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

type NavbarProps = {
  user_email: string | null;
};

export const Navbar: FC<NavbarProps> = ({ user_email }) => {
  return (
    <NavbarBS bg="light">
      <Container>
        <NavbarBS.Brand as={Link} to="/">
          {user_email}
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

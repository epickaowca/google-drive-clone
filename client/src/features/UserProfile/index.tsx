import { FC } from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { NavLink } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";

export const UserProfile: FC = () => {
  const { email } = useAuth();

  return (
    <Container>
      <div className="text-center" style={{ marginTop: "100px" }}>
        <h1>User Profile</h1>
        <p>{email}</p>
        <Button onClick={() => signOut(auth)}>Logout</Button>
        <NavLink as={Link} to="/" className="mt-3 text-success">
          Go back to Home
        </NavLink>
      </div>
    </Container>
  );
};

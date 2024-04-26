import { FC, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

export const UserProfile: FC = () => {
  const [, forceRerender] = useState<any>("");
  const [user, userLoading] = useAuthState(auth);
  if (userLoading) return <h1>Loading...</h1>;
  if (!userLoading && !user) return <Navigate to="/login" replace={true} />;

  const signOutHandler = () => {
    signOut(auth).then(() => {
      forceRerender({});
    });
  };

  return (
    <Container>
      <div className="text-center" style={{ marginTop: "100px" }}>
        <h1>User Profile</h1>
        <p>{user?.email}</p>
        <Button onClick={signOutHandler}>Logout</Button>
      </div>
    </Container>
  );
};

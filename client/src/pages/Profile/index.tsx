import { FC } from "react";
import { UserProfile } from "../../features/UserProfile";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { Navigate } from "react-router-dom";

export const Profile: FC = () => {
  const [user, userLoading] = useAuthState(auth);
  if (userLoading) return <h1>Loading...</h1>;
  if (!userLoading && !user) return <Navigate to="/login" replace={true} />;
  return <UserProfile />;
};

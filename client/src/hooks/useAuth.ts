import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const useAuth = () => {
  const [user] = useAuthState(auth);

  if (!user) {
    throw new Error("useAuth - user is undefined");
  }

  const userId = user.uid;
  return { userId };
};

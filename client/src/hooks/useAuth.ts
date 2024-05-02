import { auth } from "@root/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const useAuth = () => {
  const [user] = useAuthState(auth);
  if (!user) throw new Error("useAuth - user is undefined");

  const { uid: userId, email } = user;
  return { userId, email };
};

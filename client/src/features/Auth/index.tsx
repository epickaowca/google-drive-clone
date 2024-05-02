import { FC, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@root/firebase";
import { singIn } from "./services/singIn";
import { LoginForm } from "./components/LoginForm";
import { useAsyncFn } from "@root/hooks/useAsync";
import { isSignInWithEmailLink } from "firebase/auth";
import { Navigate } from "react-router-dom";

export const Auth: FC = () => {
  const [user, userLoading] = useAuthState(auth);
  const { execute, loading } = useAsyncFn(singIn, [user]);

  useEffect(
    function singInUser() {
      if (!user) {
        const emailLink = window.location.href;
        if (isSignInWithEmailLink(auth, emailLink)) {
          let email = localStorage.getItem("email")!;
          if (!email) {
            email = window.prompt("Please provide your email")!;
          }
          execute({ email, emailLink });
        }
      }
    },
    [user]
  );

  return (
    <>
      {userLoading || loading ? (
        <h1>Loading</h1>
      ) : user ? (
        <Navigate to="/" replace={true} />
      ) : (
        <LoginForm />
      )}
    </>
  );
};

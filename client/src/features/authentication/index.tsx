import { FC, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { singIn } from "./services/singIn";
import { LoginForm } from "./LoginForm";
import { useAsyncFn } from "../../hooks/useAsync";
import { isSignInWithEmailLink } from "firebase/auth";

export const Auth: FC = () => {
  const [user] = useAuthState(auth);
  const { execute: singInExec, loading } = useAsyncFn(singIn, [user]);

  useEffect(
    function singInUser() {
      if (!user) {
        const emailLink = window.location.href;
        if (isSignInWithEmailLink(auth, emailLink)) {
          let email = localStorage.getItem("email")!;
          if (!email) {
            email = window.prompt("Please provide your email")!;
          }
          singInExec({ email, emailLink });
        }
      }
    },
    [user]
  );

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : user ? (
        <h1>Welcome user</h1>
      ) : (
        <LoginForm />
      )}
    </>
  );
};

export const userId = "userId_432d43";

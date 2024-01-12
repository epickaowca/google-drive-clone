import { FC, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/initializer";
import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from "firebase/auth";
import { LoginForm } from "./LoginForm";

export const Auth: FC = () => {
  const [email, setEmail] = useState("");
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      alert("user already signed in");
    } else {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = localStorage.getItem("email")!;
        if (!email) {
          email = window.prompt("Please provide your email")!;
        }

        signInWithEmailLink(auth, email, window.location.href)
          .then((result) => {
            alert("congrats you singed in");
            console.log(result);
            localStorage.removeItem("email");
          })
          .catch((err) => {
            alert("error check console");
            console.log(err);
          });
      } else {
        console.log("enter email and sign in");
      }
    }
  }, []);

  return (
    <>
      <LoginForm />
      {/*       
      <h1>Login page</h1>
      <form onSubmit={submitHandler}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form> */}
    </>
  );
};

export const userId = "userId_432d43";

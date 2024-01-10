import { FC, useState } from "react";
import { firebase } from "../../firebase";

export const Auth: FC = () => {
  const [email, setEmail] = useState("");
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    firebase.auth.sendSingInLink({ email });
  };
  return (
    <>
      <h1>Login page</h1>
      <form onSubmit={submitHandler}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export const userId = "userId_432d43";

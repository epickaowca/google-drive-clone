import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../../../firebase/initializer";

export const singIn: SingIn = async ({ email }) => {
  try {
    await sendSignInLinkToEmail(auth, email, {
      url: "http://localhost:3000/login",
      handleCodeInApp: true,
    });
    return "success";
  } catch (err) {
    return Promise.reject(err ?? "Error singIn");
  }
};

export type SingIn = ({ email }: { email: string }) => Promise<string>;

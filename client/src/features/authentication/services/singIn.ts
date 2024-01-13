import {
  sendSignInLinkToEmail,
  signInWithEmailLink,
  UserCredential,
} from "firebase/auth";
import { auth } from "../../../firebase";

export const sendEmail: SendEmail = async ({ email }) => {
  try {
    await sendSignInLinkToEmail(auth, email, {
      url: "http://localhost:3000/login",
      handleCodeInApp: true,
    });
    return "success";
  } catch (err) {
    return Promise.reject(err ?? "Error sendEmail");
  }
};

export const singIn: SingIn = async ({ email, emailLink }) => {
  try {
    return await signInWithEmailLink(auth, email, emailLink);
  } catch (err) {
    return Promise.reject(err ?? "Error singIn");
  }
};

type SendEmail = ({ email }: { email: string }) => Promise<string>;
type SingIn = ({
  email,
  emailLink,
}: {
  email: string;
  emailLink: string;
}) => Promise<UserCredential>;

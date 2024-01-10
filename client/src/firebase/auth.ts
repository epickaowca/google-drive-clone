import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  connectAuthEmulator,
} from "firebase/auth";

type Email = {
  email: string;
};

const actionCodeSettings = {
  url: "",
  handleCodeInApp: true,
};

const auth = getAuth();

export const methods = {
  sendSingInLink: async ({ email }: Email) => {
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      console.log("success");
    } catch (err: any) {
      const errorCode = err.code;
      const errorMessage = err.message;
      console.log(errorCode);
      console.log(errorMessage);
    }
  },
  isSingInLink: () => {
    return isSignInWithEmailLink(auth, window.location.href);
  },
  singIn: ({ email }: Email) => {
    signInWithEmailLink(auth, email, window.location.href)
      .then((result) => {
        // Clear email from storage.
        window.localStorage.removeItem("emailForSignIn");
        // You can access the new user via result.user
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
      })
      .catch((error) => {
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
      });
  },
};

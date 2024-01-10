export {};
// import { useEffect, FC } from "react";
// import { auth } from "./firebase";
// import { useLocation } from "react-router-dom";

// const VerificationPage: FC = () => {
//   const location = useLocation();
//   useEffect(() => {
//     if (auth.isSignInWithEmailLink(window.location.href)) {
//       let email = window.localStorage.getItem("emailForSignIn");
//       if (!email) {
//         email = window.prompt("Please provide your email for confirmation");
//       }

//       auth
//         .signInWithEmailLink(email, window.location.href)
//         .then((result:any) => {
//           console.log("Successfully signed in:", result);
//           // You can redirect the user or perform any other necessary actions
//         })
//         .catch((error:any) => {
//           console.error("Error signing in with email link:", error);
//         });
//     }
//   }, [location]);

//   return (
//     <div>
//       <h1>Your App</h1>
//       {/* <PasswordlessSignIn /> */}
//     </div>
//   );
// };

// export default App;

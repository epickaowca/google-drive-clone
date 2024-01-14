import { FC } from "react";
import { GoogleDrive } from "./features/google-drive";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth } from "./features/authentication";
import { UserProfile } from "./features/user-profile";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Auth />,
  },
  {
    path: "/",
    element: <GoogleDrive />,
  },
  {
    path: "/folder/:folderId",
    element: <GoogleDrive />,
  },
  { path: "/profile", element: <UserProfile /> },
]);

const App: FC = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;

import { FC } from "react";
import { GoogleDrive } from "./features/google-drive";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth } from "./features/authentication";

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
]);

const App: FC = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;

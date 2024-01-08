import { FC, useEffect } from "react";
import { GoogleDrive } from "./features/google-drive";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GoogleDrive></GoogleDrive>,
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

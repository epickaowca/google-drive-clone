import { FC, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() =>
  import("./pages/Home").then((module) => {
    return { default: module.Home };
  })
);

const Login = lazy(() =>
  import("./pages/Login").then((module) => {
    return { default: module.Login };
  })
);

const Profile = lazy(() =>
  import("./pages/Profile").then((module) => {
    return { default: module.Profile };
  })
);

const App: FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/folder/:folderId" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

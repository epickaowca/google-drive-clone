import { FC, Suspense, lazy } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { auth } from "./firebase";

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
          <Route path="/" element={<RouteWrapper />}>
            <Route path="/" element={<Home />} />
            <Route path="/folder/:folderId" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/*" element={<h1>page does not exists</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

const RouteWrapper = () => {
  const [user, userLoading] = useAuthState(auth);
  if (userLoading) return <h1>Loading...</h1>;
  if (!userLoading && !user) return <Login />;

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Outlet />
    </Suspense>
  );
};

export default App;

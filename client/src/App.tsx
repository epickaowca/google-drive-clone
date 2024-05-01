import { FC, Suspense, lazy, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { auth } from "./firebase";
import { SpinLoader } from "./features/SpinLoader";

const Home = lazy(() =>
  import("./pages/Home").then((module) => {
    return { default: module.Home };
  })
);

const Auth = lazy(() =>
  import("./features/Auth").then((module) => {
    return { default: module.Auth };
  })
);

const Profile = lazy(() =>
  import("./pages/Profile").then((module) => {
    return { default: module.Profile };
  })
);

const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage").then((module) => {
    return { default: module.NotFoundPage };
  })
);

const App: FC = () => {
  useEffect(() => {
    document.getElementById("loader")?.remove();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RouteWrapper />}>
            <Route path="/" element={<Home />} />
            <Route path="/folder/:folderId" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

const RouteWrapper = () => {
  const [user, userLoading] = useAuthState(auth);
  if (userLoading) return <SpinLoader />;
  if (!userLoading && !user) return <Auth />;

  return (
    <Suspense fallback={<SpinLoader />}>
      <Outlet />
    </Suspense>
  );
};

export default App;

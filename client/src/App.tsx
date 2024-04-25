import { FC } from "react";
import { GoogleDrive } from "./features/google-drive";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth } from "./features/authentication";
import { UserProfile } from "./features/user-profile";

const App: FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GoogleDrive />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/folder/:folderId" element={<GoogleDrive />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

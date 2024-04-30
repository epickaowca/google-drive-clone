import { FC } from "react";
import { Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import {
  AvailableDiskSpace,
  Folders,
  Files,
  AddFile,
  AddFolder,
  Navbar,
  Breadcrumbs,
} from "../../features/GoogleDrive";
import { useDrive } from "../../context";
import { DriveProvider } from "../../context";

export const Home: FC = () => {
  const [user, userLoading] = useAuthState(auth);
  if (userLoading) return <h1>Loading...</h1>;
  if (!userLoading && !user) return <Navigate to="/login" replace={true} />;

  return (
    <DriveProvider>
      <Dashboard />
    </DriveProvider>
  );
};

const Dashboard: FC = () => {
  const { files, folders } = useDrive();

  return (
    <>
      <Navbar />
      <Container className="mt-4">
        <div className="d-flex align-items-center mb-5 position-relative">
          <AvailableDiskSpace />
          <Breadcrumbs />
          <AddFile />
          <AddFolder />
        </div>

        <Folders />
        {files.length > 0 && folders.length > 0 && <hr />}
        <Files />
      </Container>
    </>
  );
};

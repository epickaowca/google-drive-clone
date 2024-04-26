import { FC } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
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
      <Dashboard user_email={user!.email} userId={user!.uid} />
    </DriveProvider>
  );
};

type DashboardProps = {
  userId: string;
  user_email: string | null;
};

const Dashboard: FC<DashboardProps> = ({ userId, user_email }) => {
  const { folderId } = useParams();
  const { getData } = useDrive();
  const { files, folders, currentFolder } = getData(folderId || "root");

  return (
    <>
      <Navbar user_email={user_email}></Navbar>
      <Container className="mt-4">
        <div className="d-flex align-items-center mb-5 position-relative">
          <AvailableDiskSpace childFiles={files} userId={userId} />
          <Breadcrumbs currentFolder={currentFolder} />
          <AddFile />
          <AddFolder userId={userId} currentFolder={currentFolder} />
        </div>

        <Folders />
        {files.length > 0 && folders.length > 0 && <hr />}
        <Files />
      </Container>
    </>
  );
};

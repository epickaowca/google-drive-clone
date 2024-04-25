import { FC, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Container } from "react-bootstrap";
import { AddFolderBtn } from "./components/AddFolderBtn";
import { AddFileBtn } from "./components/AddFileBtn";
import { Folder } from "./components/Folder";
import { useParams } from "react-router-dom";
import { Breadcrumbs } from "./components/Breadcrumbs";
import { File } from "./components/File";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { AvailableDiskSpace } from "./components/AvailableDiskSpace";
import { useDrive } from "./context";
import { DriveProvider } from "./context";

type DashboardProps = {
  userId: string;
  user_email: string | null;
};

export const GoogleDrive: FC = () => {
  const [user, userLoading] = useAuthState(auth);
  if (userLoading) return <h1>Loading...</h1>;
  if (!userLoading && !user) return <Navigate to="/login" replace={true} />;

  return (
    <DriveProvider>
      <Dashboard user_email={user!.email} userId={user!.uid} />
    </DriveProvider>
  );
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
          <AddFileBtn userId={userId} currentFolder={currentFolder} />
          <AddFolderBtn userId={userId} currentFolder={currentFolder} />
        </div>

        {folders.length > 0 && (
          <div className="d-flex flex-wrap">
            {folders.map((folder) => (
              <div
                key={folder.id}
                style={{ maxWidth: "200px" }}
                className="p-2"
              >
                <Folder folder={folder} />
              </div>
            ))}
          </div>
        )}
        {files.length > 0 && folders.length > 0 && <hr />}
        {files.length > 0 && (
          <div className="d-flex flex-wrap">
            {files.map((file) => (
              <div key={file.id} style={{ maxWidth: "200px" }} className="p-2">
                <File file={file} userId={userId} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
};

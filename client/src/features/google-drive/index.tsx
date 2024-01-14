import { FC } from "react";
import { Navbar } from "./components/Navbar";
import { Container } from "react-bootstrap";
import { AddFolderBtn } from "./components/AddFolderBtn";
import { AddFileBtn } from "./components/AddFileBtn";
import { useFolder } from "./hooks/useFolder";
import { Folder } from "./components/Folder";
import { useParams } from "react-router-dom";
import { Breadcrumbs } from "./components/Breadcrumbs";
import { File } from "./components/File";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

type DashboardProps = {
  userId: string;
  user_email: string | null;
};

export const GoogleDrive: FC = () => {
  const [user, userLoading] = useAuthState(auth);
  if (userLoading) return <h1>Loading...</h1>;
  if (!userLoading && !user) return <Navigate to="/login" replace={true} />;

  return <Dashboard user_email={user!.email} userId={user!.uid} />;
};

const Dashboard: FC<DashboardProps> = ({ userId, user_email }) => {
  const { folderId } = useParams();
  const { folder, childFiles, childFolders } = useFolder({
    folderId,
    userId,
  });

  return (
    <>
      <Navbar user_email={user_email}></Navbar>
      <Container className="mt-4">
        <div className="d-flex align-items-center mb-5">
          {folder && (
            <>
              <Breadcrumbs currentFolder={folder} />
              <AddFileBtn userId={userId} currentFolder={folder} />
              <AddFolderBtn userId={userId} currentFolder={folder} />
            </>
          )}
        </div>
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map((childFolder) => (
              <div
                key={childFolder.id}
                style={{ maxWidth: "200px" }}
                className="p-2"
              >
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}
        {childFiles.length > 0 && childFolders.length > 0 && <hr />}
        {childFiles.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFiles.map((childFile) => (
              <div
                key={childFile.name}
                style={{ maxWidth: "200px" }}
                className="p-2"
              >
                <File file={childFile} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
};

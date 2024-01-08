import { FC } from "react";
import { Navbar } from "./Navbar";
import { Container } from "react-bootstrap";
import { AddFolderBtn } from "./AddFolderBtn";
import { useFolder } from "../hooks/useFolder";
import { Folder } from "./Folder";
import { useParams } from "react-router-dom";
import { Breadcrumbs } from "./Breadcrumbs";

export const Dashboard: FC = () => {
  const { folderId } = useParams();
  const { folder, childFolders } = useFolder({
    folderId,
  });
  console.log("folder");
  console.log(folder);
  return (
    <>
      <Navbar></Navbar>
      <Container className="mt-4">
        <div className="d-flex align-items-center">
          <Breadcrumbs currentFolder={folder} />
          <AddFolderBtn currentFolder={folder} />
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
      </Container>
    </>
  );
};

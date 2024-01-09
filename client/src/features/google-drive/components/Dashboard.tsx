import { FC } from "react";
import { Navbar } from "./Navbar";
import { Container } from "react-bootstrap";
import { AddFolderBtn } from "./AddFolderBtn";
import { AddFileBtn } from "./AddFileBtn";
import { useFolder } from "../hooks/useFolder";
import { Folder } from "./Folder";
import { useParams } from "react-router-dom";
import { Breadcrumbs } from "./Breadcrumbs";
import { File } from "./File";

export const Dashboard: FC = () => {
  const { folderId } = useParams();
  const { folder, childFiles, childFolders } = useFolder({
    folderId,
  });
  console.log(childFiles);
  return (
    <>
      <Navbar></Navbar>
      <Container className="mt-4">
        <div className="d-flex align-items-center mb-5">
          {folder && (
            <>
              <Breadcrumbs currentFolder={folder} />
              <AddFileBtn currentFolder={folder} />
              <AddFolderBtn currentFolder={folder} />
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

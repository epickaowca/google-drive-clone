import { FC } from "react";
import { Navbar } from "./Navbar";
import { Container } from "react-bootstrap";
import { AddFolderBtn } from "./AddFolderBtn";
import { useFolder } from "../hooks/useFolder";
import { Folder } from "./Folder";

export const Dashboard: FC = () => {
  const { folder, childFolders } = useFolder({
    folderId: "5ppFO3fqSs7OhJMiijIa",
  });
  console.log(childFolders);
  return (
    <>
      <Navbar></Navbar>
      <Container>
        <AddFolderBtn currentFolder={folder} />
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map((childFolder) => (
              <div
                key={childFolder.id}
                style={{ maxWidth: "250px" }}
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

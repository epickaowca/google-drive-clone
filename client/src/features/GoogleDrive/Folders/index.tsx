import { FC } from "react";
import { Folder } from "./components/Folder";
import { useDrive } from "../../../context";
import { useParams } from "react-router-dom";

export const Folders: FC = () => {
  const { folderId } = useParams();
  const { getData } = useDrive();
  const { folders } = getData(folderId || "root");

  return (
    <>
      {folders.length > 0 && (
        <div className="d-flex flex-wrap">
          {folders.map((folder) => (
            <div key={folder.id} style={{ maxWidth: "200px" }} className="p-2">
              <Folder folder={folder} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

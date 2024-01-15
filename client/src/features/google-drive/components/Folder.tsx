import { FC } from "react";
import { FirebaseFolder } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faRemove } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useFolder } from "../hooks/useFolder";

type FolderProps = {
  folder: FirebaseFolder;
  userId: string;
};

export const Folder: FC<FolderProps> = ({ folder, userId }) => {
  const {
    folder: currentFolder,
    childFiles,
    childFolders,
  } = useFolder({ folder, userId });

  return (
    <div style={{ display: "flex" }}>
      <Link
        to={`/folder/${folder.id}`}
        className="btn btn-outline-dark text-truncate w-100 border-end-0 rounded-end-0"
      >
        <FontAwesomeIcon icon={faFolder} />
        <span className="ms-2">{folder.name}</span>
      </Link>
      <button className="btn btn-outline-dark border-start-0 rounded-start-0">
        <FontAwesomeIcon icon={faRemove} />
      </button>
    </div>
  );
};

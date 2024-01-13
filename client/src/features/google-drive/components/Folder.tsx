import { FC } from "react";
import { FirebaseFolder } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

type FolderProps = {
  folder: FirebaseFolder;
};

export const Folder: FC<FolderProps> = ({ folder }) => {
  return (
    <Link
      to={`/folder/${folder.id}`}
      className="btn btn-outline-dark text-truncate w-100"
    >
      <FontAwesomeIcon icon={faFolder} />
      <span className="ms-2">{folder.name}</span>
    </Link>
  );
};

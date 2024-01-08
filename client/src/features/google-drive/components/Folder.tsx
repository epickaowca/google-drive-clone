import { FC } from "react";
import { FirebaseFolder } from "../../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

type FolderProps = {
  folder: FirebaseFolder;
};

export const Folder: FC<FolderProps> = ({ folder }) => {
  return (
    <Link
      to={`/folder/${folder.id}`}
      className="btn btn-outline-dark btn-lg text-truncate w-100"
    >
      <FontAwesomeIcon icon={faFolder} />
      <span className="ms-2">{folder.name}</span>
    </Link>
  );
};

import { FC } from "react";
import { FirebaseFile } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

type FileProps = {
  file: FirebaseFile;
};

export const File: FC<FileProps> = ({ file }) => {
  return (
    <a
      href={file.url}
      target="_blank"
      className="btn btn-outline-dark text-truncate w-100"
    >
      <FontAwesomeIcon icon={faFile} />
      <span className="ms-2">{file.name}</span>
    </a>
  );
};

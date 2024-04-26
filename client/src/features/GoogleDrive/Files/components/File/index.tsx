import { FC, useState } from "react";
import { FirebaseFile } from "../../../../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faRemove } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../../../Modal";
import { removeFile } from "../../services";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../../firebase";

type FileProps = {
  file: FirebaseFile;
};

export const File: FC<FileProps> = ({ file }) => {
  const [user] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false);
  const onSubmitHandler = async () => {
    await removeFile({
      fileId: file.id,
      filePath: file.filePath,
      userId: user!.uid,
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <a
        href={file.url}
        target="_blank"
        className="btn btn-outline-dark text-truncate w-100 border-end-0 rounded-end-0"
        style={{ position: "relative" }}
      >
        <FontAwesomeIcon icon={faFile} />
        <span className="ms-2">{file.name}</span>
      </a>
      <button
        onClick={() => setIsOpen(true)}
        className="btn btn-outline-dark border-start-0 rounded-start-0"
      >
        <FontAwesomeIcon icon={faRemove} />
      </button>
      {isOpen && (
        <Modal
          onSubmit={onSubmitHandler}
          message={`Are you sure you want to delete ${file.name}?`}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

import { FC, useState } from "react";
import { FirebaseFile } from "@root/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faRemove } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "@root/features/GoogleDrive";
import { removeFile } from "../../services";
import { useAuth } from "@root/hooks/useAuth";

type FileProps = {
  file: FirebaseFile;
};

export const File: FC<FileProps> = ({ file: { id, filePath, name, url } }) => {
  const { userId } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const onSubmitHandler = async () => {
    await removeFile({
      fileId: id,
      filePath: filePath,
      userId,
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <a
        href={url}
        target="_blank"
        className="btn btn-outline-dark text-truncate w-100 border-end-0 rounded-end-0"
        style={{ position: "relative" }}
      >
        <FontAwesomeIcon icon={faFile} />
        <span className="ms-2">{name}</span>
      </a>
      <button
        aria-label="remove file"
        onClick={() => setIsOpen(true)}
        className="btn btn-outline-dark border-start-0 rounded-start-0"
      >
        <FontAwesomeIcon icon={faRemove} />
      </button>
      {isOpen && (
        <Modal
          onSubmit={onSubmitHandler}
          message={`Are you sure you want to delete ${name}?`}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

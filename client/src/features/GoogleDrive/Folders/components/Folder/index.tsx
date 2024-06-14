import { FC, useState } from "react";
import { FirebaseFolder } from "@root/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faRemove } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { removeFolder } from "../../services";
import { Modal } from "@root/features/GoogleDrive";
import { useDrive } from "@root/context";
import { useEvent } from "@owcaofficial/web-analytics";

type FolderProps = {
  folder: FirebaseFolder;
};

export const Folder: FC<FolderProps> = ({ folder }) => {
  const sendEvent = useEvent();
  const { files, folders } = useDrive(folder.id);
  const [isOpen, setIsOpen] = useState(false);
  const isEmpty = files.length === 0 && folders.length === 0;

  const onSubmitHandler = async () => {
    if (isEmpty) {
      await removeFolder(folder.id!);
      sendEvent("remove_folder_action", "remove_folder");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Link
        to={`/folder/${folder.id}`}
        className="btn btn-outline-dark text-truncate w-100 border-end-0 rounded-end-0"
      >
        <FontAwesomeIcon icon={faFolder} />
        <span className="ms-2">{folder.name}</span>
      </Link>
      <button
        aria-label="remove folder"
        onClick={() => setIsOpen(true)}
        className="btn btn-outline-dark border-start-0 rounded-start-0"
      >
        <FontAwesomeIcon icon={faRemove} />
      </button>
      {isOpen && (
        <Modal
          error={!isEmpty ? "folder must be empty" : false}
          onSubmit={onSubmitHandler}
          message={`Are you sure you want to delete ${folder.name}?`}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

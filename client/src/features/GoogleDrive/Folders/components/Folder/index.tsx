import { FC, useState } from "react";
import { FirebaseFolder } from "../../../../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faRemove } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { removeFolder } from "../../services";
import { Modal } from "../../../Modal";
import { useDrive } from "../../../../../context";

type FolderProps = {
  folder: FirebaseFolder;
};

export const Folder: FC<FolderProps> = ({ folder }) => {
  const { getData } = useDrive();
  const { files, folders } = getData(folder.id);

  const [isOpen, setIsOpen] = useState(false);
  const isEmpty = files.length === 0 && folders.length === 0;
  const onSubmitHandler = async () => {
    if (isEmpty) {
      await removeFolder(folder.id!);
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

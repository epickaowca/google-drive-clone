import { FC, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FirebaseFolder } from "../types";
import { createFolder } from "../services/firestore";
import { ROOT_FOLDER } from "../hooks/useFolder";

type AddFolderBtnProps = {
  currentFolder: FirebaseFolder;
  userId: string;
};

export const AddFolderBtn: FC<AddFolderBtnProps> = ({
  currentFolder,
  userId,
}) => {
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState("");

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentFolder == null) return;

    const path = [...currentFolder.path];
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }
    if (currentFolder.path.length === 0) {
      path.push({ name: ROOT_FOLDER.name, id: ROOT_FOLDER.id });
    }

    await createFolder({
      name: folderName,
      parentId: currentFolder.id,
      userId,
      path,
    });

    setFolderName("");
    closeModal();
  };
  return (
    <>
      <Button onClick={openModal} variant="outline-success" size="lg">
        <FontAwesomeIcon icon={faFolderPlus} />
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Folder Name</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                required
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Add Folder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

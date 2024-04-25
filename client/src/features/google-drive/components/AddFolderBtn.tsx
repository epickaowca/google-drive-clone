import { FC, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FirebaseFolder } from "../types";
import { createFolder } from "../services/firestore";

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
    if (folderName === "") return;

    const path = [
      ...currentFolder.path,
      { name: currentFolder.name, id: currentFolder.id },
    ];

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
              <Form.Label htmlFor="folder_name_input">Folder Name</Form.Label>
              <Form.Control
                id="folder_name_input"
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

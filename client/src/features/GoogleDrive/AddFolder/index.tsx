import { FC, useState, useId } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FirebaseFolder } from "../../../types";
import { createFolder } from "./services";

type AddFolderBtnProps = {
  currentFolder: FirebaseFolder;
  userId: string;
};

export const AddFolder: FC<AddFolderBtnProps> = ({ currentFolder, userId }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [folderName, setFolderName] = useState("");
  const inputId = useId();

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
    setShowDialog(false);
  };
  return (
    <>
      <Button
        onClick={() => setShowDialog(true)}
        variant="outline-success"
        size="lg"
      >
        <FontAwesomeIcon icon={faFolderPlus} />
      </Button>
      <Modal show={showDialog} onHide={() => setShowDialog(false)}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label htmlFor={inputId}>Folder Name</Form.Label>
              <Form.Control
                id={inputId}
                autoFocus
                required
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDialog(false)}>
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

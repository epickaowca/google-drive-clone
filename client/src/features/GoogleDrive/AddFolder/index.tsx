import { FC, useState, useId } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { createFolder } from "./services";
import { useDrive } from "../../../context";
import { useAuth } from "../../../hooks/useAuth";

export const AddFolder: FC = () => {
  const { userId } = useAuth();
  const {
    currentFolder: { path, name, id },
  } = useDrive();
  const [showDialog, setShowDialog] = useState(false);
  const [folderName, setFolderName] = useState("");
  const inputId = useId();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (folderName === "") return;

    await createFolder({
      name: folderName,
      parentId: id,
      userId,
      path: [...path, { name, id }],
    });

    setFolderName("");
    setShowDialog(false);
  };

  return (
    <>
      <Button
        aria-label="add folder"
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

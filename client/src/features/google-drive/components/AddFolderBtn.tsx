import { FC, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { firebase } from "../../../firebase";
import { userId } from "../../authentication/index";

type AddFolderBtnProps = {
  currentFolder: { id: string };
};

export const AddFolderBtn: FC<AddFolderBtnProps> = ({ currentFolder }) => {
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

    await firebase.createFolder({
      name: folderName,
      parentId: currentFolder.id,
      userId,
      path: ["pathtest"],
    });

    setFolderName("");
    closeModal();
  };
  return (
    <>
      <Button onClick={openModal} variant="outline-success">
        <FontAwesomeIcon icon={faFolderPlus} />
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Folder Name</Form.Label>
              <Form.Control
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

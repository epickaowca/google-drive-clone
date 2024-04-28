import { FC, useState } from "react";
import { Modal as ModalBS, Button } from "react-bootstrap";

type ModalProps = {
  onClose: () => void;
  onSubmit: () => void;
  message: string;
  error?: string | boolean;
};

export const Modal: FC<ModalProps> = ({
  onClose,
  error,
  message,
  onSubmit,
}) => {
  const [open, setOpen] = useState(true);

  const closeModal = () => {
    setOpen(false);
  };

  const submitHandler = async () => {
    closeModal();
    onSubmit && onSubmit();
    onClose && onClose();
  };

  return (
    <ModalBS show={open} onHide={closeModal}>
      <ModalBS.Body className="text-center">
        {error ? error : message}
      </ModalBS.Body>
      <ModalBS.Footer className="justify-content-center">
        <Button variant={error ? "danger" : "dark"} onClick={submitHandler}>
          {error ? "OK" : "Remove"}
        </Button>
      </ModalBS.Footer>
    </ModalBS>
  );
};
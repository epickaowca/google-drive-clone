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
  const submitHandler = async () => {
    onSubmit && onSubmit();
    onClose && onClose();
  };

  return (
    <ModalBS show={true} onHide={onClose}>
      <ModalBS.Body className="text-center">{error || message}</ModalBS.Body>
      <ModalBS.Footer className="justify-content-center">
        <Button variant={error ? "danger" : "dark"} onClick={submitHandler}>
          {error ? "OK" : "Remove"}
        </Button>
      </ModalBS.Footer>
    </ModalBS>
  );
};

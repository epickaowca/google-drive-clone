import { FC, useState } from "react";
import ReactDOM from "react-dom";
import { FirebaseFolder, UploadTaskCB } from "../types";
import { uploadFile } from "../services/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidV4 } from "uuid";
import { ProgressBar, Toast } from "react-bootstrap";

type AddFileBtnProps = {
  currentFolder: FirebaseFolder;
  userId: string;
};

type UploadingFiles =
  | { id: string | null; name: string; progress: number; error: boolean }[]
  | [];

export const AddFileBtn: FC<AddFileBtnProps> = ({ currentFolder, userId }) => {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFiles>([]);
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    const filePath =
      currentFolder.path.length > 0
        ? `${currentFolder.path.map((e) => e.name).join("/")}/${
            currentFolder.name
          }/${file.name}`
        : `Root/${file.name}`;
    const fullPath = `/files/${userId}/${filePath}`;

    const id = uuidV4();
    setUploadingFiles((prev) => [
      ...prev,
      { id, name: file.name, progress: 0, error: false },
    ]);

    const uploadTaskCB: UploadTaskCB = (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadingFiles((prev) => {
        return prev.map((file) => {
          if (file.id === id) {
            return { ...file, progress };
          }
          return file;
        });
      });
    };

    const errorCB = async () => {
      setUploadingFiles((prev) => {
        return prev.map((file) => {
          if (file.id === id) {
            return { ...file, error: true };
          }
          return file;
        });
      });
    };

    const finishCB = async () => {
      setUploadingFiles((prev) => {
        return prev.filter((file) => {
          return file.id !== id;
        });
      });
    };

    await uploadFile({
      filePath: fullPath,
      file,
      folderId: currentFolder.id,
      userId,
      uploadTaskCB,
      finishCB,
      errorCB,
    });
  };
  return (
    <>
      <label className="btn btn-outline-success btn-lg m-0 me-2">
        <FontAwesomeIcon icon={faFileUpload} />
        <input
          type="file"
          onChange={handleUpload}
          style={{ opacity: 0, position: "absolute", left: "-9999px" }}
        />
      </label>
      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              maxWidth: "250px",
            }}
          >
            {uploadingFiles.map((file) => (
              <Toast
                key={file.id}
                onClose={() => {
                  setUploadingFiles((prev) => {
                    return prev.filter(
                      (uploadFile) => uploadFile.id !== file.id
                    );
                  });
                }}
              >
                <Toast.Header
                  closeButton={file.error}
                  className="text-truncate w-100 d-block"
                >
                  {file.name}
                </Toast.Header>
                <Toast.Body>
                  <ProgressBar
                    animated={!file.error}
                    variant={file.error ? "danger" : "primary"}
                    now={file.error ? 100 : file.progress}
                    label={
                      file.error ? "error" : `${Math.round(file.progress)}%`
                    }
                  />
                </Toast.Body>
              </Toast>
            ))}
          </div>,
          document.body
        )}
    </>
  );
};

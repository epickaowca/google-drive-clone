import { FC, useEffect, useState } from "react";
import { ProgressBar, Toast } from "react-bootstrap";
import { fileExists } from "../services";
import { useParams } from "react-router-dom";
import { useDrive } from "../../../../context";
import { auth, storage } from "../../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createFile } from "../services";

type FileToastProps = {
  id: string;
  file: File;
  onClose: () => void;
};

type UploadingFile = {
  id: string | null;
  name: string;
  progress: number;
  error: string | null;
};

export const FileToast: FC<FileToastProps> = ({ id, file, onClose }) => {
  const { name, size } = file;
  const [{ error, progress }, setUploadingFile] = useState<UploadingFile>({
    id,
    name: name,
    progress: 0,
    error: null,
  });
  const [user] = useAuthState(auth);
  const userId = user!.uid;
  const { folderId } = useParams();
  const { getData } = useDrive();
  const { currentFolder } = getData(folderId || "root");

  useEffect(() => {
    const asyncFunc = async () => {
      const fileAlreadyExists = await fileExists({
        folderId: currentFolder.id,
        name,
        userId,
      });
      const fileObj = { id, name, error: null, progress: 0 };

      if (fileAlreadyExists) {
        const error = `file already exists in this directory`;
        setUploadingFile({ ...fileObj, error });
        setTimeout(() => {
          onClose();
        }, 5000);
        return "";
      }

      const filePath = `/files/${userId}/${currentFolder.path
        .map((e) => e.name)
        .join("/")}/${currentFolder.name}/${name}`;
      const fileRef = ref(storage, filePath);

      setUploadingFile(fileObj);
      const uploadTask = uploadBytesResumable(fileRef, file);
      uploadTask.on(
        "state_changed",
        ({ bytesTransferred, totalBytes }) => {
          const progress = Math.round((bytesTransferred / totalBytes) * 100);
          setUploadingFile({ ...fileObj, progress });
        },
        () => {
          const error = "error uploading file";
          setUploadingFile({ ...fileObj, error });
          setTimeout(() => {
            onClose();
          }, 5000);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          await createFile({
            filePath,
            folderId: currentFolder.id,
            name,
            size,
            url,
            userId,
          });
          onClose();
        }
      );
    };

    asyncFunc();
  }, []);

  return (
    <Toast>
      <Toast.Header className="text-truncate w-100 d-block">
        {name}
      </Toast.Header>
      <Toast.Body>
        <ProgressBar
          animated
          variant={error ? "danger" : "primary"}
          now={error ? 100 : progress}
          label={error ?? `${Math.round(progress)}%`}
        />
      </Toast.Body>
    </Toast>
  );
};

import { FC, useEffect, useState } from "react";
import { ProgressBar, Toast } from "react-bootstrap";
import { fileExists } from "../services";
import { useDrive } from "../../../../context";
import { storage } from "../../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { createFile } from "../services";
import { getSizeMeasurementFile } from "../../../../services";
import { MAX_SPACE_IN_BYTES } from "../../AvailableDiskSpace";
import { useAuth } from "../../../../hooks/useAuth";

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
  const { userId } = useAuth();
  const { currentFolder } = useDrive();

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

      const { diskSpaceUsed } = await getSizeMeasurementFile(userId);
      if (diskSpaceUsed + file.size > MAX_SPACE_IN_BYTES) {
        const error = `Maximum disk space usage exceeded`;
        setUploadingFile({ ...fileObj, error });
        setTimeout(() => {
          onClose();
        }, 5000);
        return "";
      }

      const filePath = `/files/${userId}/${currentFolder.path
        .map((e) => e.name)
        .join("/")}${currentFolder.name}/${name}`;
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

import { db, storage } from "../../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  getDocs,
  collection,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { UploadTaskCB } from "../../../../types";
import { updateSizeMeasurementFile } from "../../../../services";
import { createFile } from "../../../../services";

export const uploadFile = async ({
  filePath,
  file,
  folderId,
  userId,
  finishCB,
  uploadTaskCB,
  errorCB,
}: UploadFileProps) => {
  const fileRef = ref(storage, filePath);
  const uploadTask = uploadBytesResumable(fileRef, file);
  uploadTask.on("state_changed", uploadTaskCB, errorCB, async () => {
    finishCB();
    const url = await getDownloadURL(uploadTask.snapshot.ref);

    const q = query(
      collection(db, "files"),
      where("name", "==", file.name),
      where("userId", "==", userId),
      where("folderId", "==", folderId)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
      await updateDoc(querySnapshot.docs[0].ref, {
        url,
      });
    } else {
      await updateSizeMeasurementFile({
        bytes: uploadTask.snapshot.totalBytes,
        userId,
      });
      await createFile({
        folderId,
        name: file.name,
        url,
        userId,
        filePath,
      });
    }
  });
};

type UploadFileProps = {
  filePath: string;
  file: File;
  folderId: string | null;
  userId: string;
  uploadTaskCB: UploadTaskCB;
  finishCB: () => void;
  errorCB: () => void;
};

import { db, storage } from "../../../../firebase";
import { ref, deleteObject, getMetadata } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";
import { updateSizeMeasurementFile } from "../../../../services";

export const removeFile = async ({
  fileId,
  filePath,
  userId,
}: RemoveFileArgs) => {
  const fileRef = ref(storage, filePath);
  const { size } = await getMetadata(fileRef);

  try {
    await updateSizeMeasurementFile({
      bytes: -size,
      userId,
    });
    await deleteObject(fileRef);
    await deleteDoc(doc(db, "files", fileId));
  } catch (err) {
    throw err;
  }
};

type RemoveFileArgs = {
  filePath: string;
  fileId: string;
  userId: string;
};

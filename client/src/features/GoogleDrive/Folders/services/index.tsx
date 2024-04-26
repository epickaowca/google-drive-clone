import { db } from "../../../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

export const removeFolder = async (folderId: string) => {
  try {
    return await deleteDoc(doc(db, "folders", folderId));
  } catch (err) {
    throw err;
  }
};

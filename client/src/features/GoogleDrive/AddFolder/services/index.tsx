import { db } from "../../../../firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

export const createFolder = async (args: CreateFolderArgs) => {
  return await addDoc(collection(db, "folders"), {
    createdAt: Timestamp.now(),
    ...args,
  });
};

type CreateFolderArgs = {
  name: string;
  parentId: string | null;
  userId: string;
  path: any[];
};

import { db } from "../../../../firebase";
import {
  getDocs,
  collection,
  query,
  where,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { updateSizeMeasurementFile } from "../../../../services";

export const fileExists = async ({
  folderId,
  name,
  userId,
}: fileExistsArgs) => {
  const { docs } = await getDocs(
    query(
      collection(db, "files"),
      where("name", "==", name),
      where("userId", "==", userId),
      where("folderId", "==", folderId)
    )
  );
  return docs.length > 0;
};

export const createFile = async ({ size, ...rest }: CreateFileArgs) => {
  await updateSizeMeasurementFile({ userId: rest.userId, bytes: size });
  await addDoc(collection(db, "files"), {
    createdAt: Timestamp.now(),
    ...rest,
  });
};

type CreateFileArgs = {
  url: string;
  name: string;
  folderId: string | null;
  userId: string;
  filePath: string;
  size: number;
};

type fileExistsArgs = {
  name: string;
  userId: string;
  folderId: string;
};

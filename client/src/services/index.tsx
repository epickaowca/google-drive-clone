import { db } from "../firebase";
import {
  getDocs,
  doc,
  collection,
  Timestamp,
  query,
  where,
  updateDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";

export const getSizeMeasurementFile = async (userId: string) => {
  const { docs } = await getDocs(
    query(collection(db, "sizeMeasurement"), where("userId", "==", userId))
  );
  return docs.length > 0 ? docs[0].data() : { diskSpaceUsed: 0 };
};

export const updateSizeMeasurementFile = async ({
  userId,
  bytes,
}: CreateSizeMeasurementFileArgs) => {
  const { docs } = await getDocs(
    query(collection(db, "sizeMeasurement"), where("userId", "==", userId))
  );

  if (docs.length > 0) {
    const prevValue = docs[0].data().diskSpaceUsed;
    await updateDoc(docs[0].ref, {
      diskSpaceUsed: prevValue + bytes,
    });
  } else {
    createSizeMeasurementFile({ userId, bytes });
  }
};

export const createFile = async (args: CreateFileArgs) => {
  const docRef = await addDoc(collection(db, "files"), {
    createdAt: Timestamp.now(),
    ...args,
  });
  return docRef;
};

const createSizeMeasurementFile = async ({
  userId,
  bytes,
}: CreateSizeMeasurementFileArgs) => {
  await setDoc(doc(collection(db, "sizeMeasurement")), {
    userId,
    diskSpaceUsed: bytes,
    createdAt: Timestamp.now(),
  });
};

type CreateSizeMeasurementFileArgs = {
  userId: string;
  bytes: number;
};

type CreateFileArgs = {
  url: string;
  name: string;
  folderId: string | null;
  userId: string;
  filePath: string;
};

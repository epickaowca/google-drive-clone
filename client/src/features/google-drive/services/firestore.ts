import { db, storage } from "../../../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  getMetadata,
} from "firebase/storage";
import {
  onSnapshot,
  getDoc,
  getDocs,
  doc,
  addDoc,
  collection,
  Timestamp,
  query,
  where,
  orderBy,
  updateDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { FirebaseFolder, UploadTaskCB, GetQueryCB } from "../types";

export const createDocument = async (args: CreateDocumentArgs) => {
  const docRef = await addDoc(collection(db, "files"), {
    createdAt: Timestamp.now(),
    ...args,
  });
  return docRef;
};

export const getSizeMeasurementFile = async (userId: string) => {
  const { docs } = await getDocs(
    query(collection(db, "sizeMeasurement"), where("userId", "==", userId))
  );
  return docs.length > 0 ? docs[0].data() : { diskSpaceUsed: 0 };
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

const updateSizeMeasurementFile = async ({
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

export const createFolder = async (args: CreateFolderArgs) => {
  return await addDoc(collection(db, "folders"), {
    createdAt: Timestamp.now(),
    ...args,
  });
};

export const getFolderById = async (folderId: string) => {
  const { data, exists, id } = await getDoc(doc(db, "folders", folderId));
  if (exists()) {
    return {
      id,
      ...data(),
    } as FirebaseFolder;
  } else {
    throw "No such document!";
  }
};

export const removeFolder = async (folderId: string) => {
  try {
    return await deleteDoc(doc(db, "folders", folderId));
  } catch (err) {
    throw err;
  }
};

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

export const getChildFiles = ({
  folderId,
  userId,
  callbackFunc,
}: GetChildFilesProps) => {
  const q = query(
    collection(db, "files"),
    where("folderId", "==", folderId),
    where("userId", "==", userId),
    orderBy("createdAt")
  );
  const unsubscribe = onSnapshot(q, callbackFunc);
  return unsubscribe;
};

export const getChildFolders = ({
  parentId,
  userId,
  callbackFunc,
}: GetChildFoldersProps) => {
  const q = query(
    collection(db, "folders"),
    where("parentId", "==", parentId),
    where("userId", "==", userId),
    orderBy("createdAt")
  );
  const unsubscribe = onSnapshot(q, callbackFunc);
  return unsubscribe;
};

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
      await createDocument({
        folderId,
        name: file.name,
        url,
        userId,
        filePath,
      });
    }
  });
};

type CreateDocumentArgs = {
  url: string;
  name: string;
  folderId: string | null;
  userId: string;
  filePath: string;
};

type CreateSizeMeasurementFileArgs = {
  userId: string;
  bytes: number;
};

type RemoveFileArgs = {
  filePath: string;
  fileId: string;
  userId: string;
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

type GetChildFilesProps = {
  folderId: string | null;
  userId: string;
  callbackFunc: GetQueryCB;
};

type GetChildFoldersProps = {
  parentId: string | null;
  userId: string;
  callbackFunc: GetQueryCB;
};

type CreateFolderArgs = {
  name: string;
  parentId: string | null;
  userId: string;
  path: any[];
};

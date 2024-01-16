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

export const createDocument = async ({
  url,
  name,
  folderId,
  userId,
  filePath,
}: CreateDocumentProps) => {
  const docRef = await addDoc(collection(db, "files"), {
    name,
    createdAt: Timestamp.now(),
    folderId,
    url,
    userId,
    filePath,
  });
  return docRef;
};

export const getSizeMeasurementFile = async (userId: string) => {
  const q = query(
    collection(db, "sizeMeasurement"),
    where("userId", "==", userId)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length > 0) {
    return querySnapshot.docs[0].data();
  } else {
    return { diskSpaceUsed: 0 };
  }
};

const createSizeMeasurementFile = async ({
  bytes,
  userId,
}: CreateSizeMeasurementFileProps) => {
  const sizeMeasurementRef = doc(collection(db, "sizeMeasurement"));
  await setDoc(sizeMeasurementRef, {
    userId,
    createdAt: Timestamp.now(),
    diskSpaceUsed: bytes,
  });
};

const updateSizeMeasurementFile = async ({
  bytes,
  userId,
}: CreateSizeMeasurementFileProps) => {
  const q = query(
    collection(db, "sizeMeasurement"),
    where("userId", "==", userId)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length > 0) {
    const prevDiskSpaceUsed = querySnapshot.docs[0].data().diskSpaceUsed;
    await updateDoc(querySnapshot.docs[0].ref, {
      diskSpaceUsed: prevDiskSpaceUsed + bytes,
    });
  } else {
    createSizeMeasurementFile({ userId, bytes });
  }
};

export const createFolder = async ({
  name,
  parentId,
  path,
  userId,
}: CreateFolderProps) => {
  const docRef = await addDoc(collection(db, "folders"), {
    name,
    createdAt: Timestamp.now(),
    parentId,
    path,
    userId,
  });
  return docRef;
};

export const getFolderById = async (folderId: string) => {
  const docRef = doc(db, "folders", folderId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const formattedDoc = {
      id: docSnap.id,
      ...docSnap.data(),
    } as FirebaseFolder;

    return formattedDoc;
  } else {
    throw "No such document!";
  }
};

export const removeFolder = async (folderId: string) => {
  const docRef = doc(db, "folders", folderId);
  try {
    return await deleteDoc(docRef);
  } catch (err) {
    throw err;
  }
};

export const removeFile = async ({
  fileId,
  filePath,
  userId,
}: RemoveFileProps) => {
  const docRef = doc(db, "files", fileId);
  const fileRef = ref(storage, filePath);
  const size = (await getMetadata(fileRef)).size;

  try {
    await updateSizeMeasurementFile({
      bytes: -size,
      userId,
    });
    await deleteObject(fileRef);
    await deleteDoc(docRef);
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

type CreateSizeMeasurementFileProps = {
  userId: string;
  bytes: number;
};

type RemoveFileProps = {
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

type CreateDocumentProps = {
  url: string;
  name: string;
  folderId: string | null;
  userId: string;
  filePath: string;
};

type CreateFolderProps = {
  name: string;
  parentId: string | null;
  userId: string;
  path: any[];
};

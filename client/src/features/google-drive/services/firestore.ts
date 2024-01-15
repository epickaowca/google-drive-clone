import { db, storage } from "../../../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
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
    console.log(err);
  }
};

export const removeFile = async ({ fileId, filePath }: RemoveFileProps) => {
  const docRef = doc(db, "files", fileId);
  const fileRef = ref(storage, filePath);
  try {
    await deleteObject(fileRef);
    await deleteDoc(docRef);
  } catch (err) {
    console.log(err);
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
      console.log("file existing");
      await updateDoc(querySnapshot.docs[0].ref, {
        url,
      });
    } else {
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

type RemoveFileProps = {
  filePath: string;
  fileId: string;
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

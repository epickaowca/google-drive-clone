import { db, storage } from "./initializer";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
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
} from "firebase/firestore";
import {
  CreateDocumentProps,
  CreateFolderProps,
  FirebaseFolder,
  GetChildFilesProps,
  GetChildFoldersProps,
  UploadFileProps,
} from "./types";

export const methods = {
  uploadFile: async ({
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
        await methods.createDocument({
          folderId,
          name: file.name,
          url,
          userId,
        });
      }
    });
  },

  getChildFolders: ({
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
  },

  getChildFiles: ({ folderId, userId, callbackFunc }: GetChildFilesProps) => {
    const q = query(
      collection(db, "files"),
      where("folderId", "==", folderId),
      where("userId", "==", userId),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(q, callbackFunc);
    return unsubscribe;
  },

  getFolderById: async (folderId: string) => {
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
  },

  createFolder: async ({ name, parentId, path, userId }: CreateFolderProps) => {
    const docRef = await addDoc(collection(db, "folders"), {
      name,
      createdAt: Timestamp.now(),
      parentId,
      path,
      userId,
    });
    return docRef;
  },

  createDocument: async ({
    url,
    name,
    folderId,
    userId,
  }: CreateDocumentProps) => {
    const docRef = await addDoc(collection(db, "files"), {
      name,
      createdAt: Timestamp.now(),
      folderId,
      url,
      userId,
    });
    return docRef;
  },
};

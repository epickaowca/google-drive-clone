import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  onSnapshot,
  getFirestore,
  getDoc,
  doc,
  addDoc,
  collection,
  Timestamp,
  query,
  where,
  orderBy,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPPkIxgzXFVJzXUeVxjg4uXzvAWUWJSmI",
  authDomain: "drive-clone-42a8f.firebaseapp.com",
  projectId: "drive-clone-42a8f",
  storageBucket: "drive-clone-42a8f.appspot.com",
  messagingSenderId: "173028159850",
  appId: "1:173028159850:web:19e725ece636bb4794b513",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

export type FirebaseFolder = {
  createdAt: Timestamp | null;
  name: string;
  id: string | null;
  parentId: string | null;
  path: { id: string | null; name: string }[] | [];
  userId: string;
};

export type FirebaseFile = {
  createdAt: Timestamp | null;
  folderId: string | null;
  name: string;
  url: string;
  userId: string;
};

type CreateFolderProps = {
  name: string;
  parentId: string | null;
  userId: string;
  path: any[];
};

type CreateDocumentProps = {
  url: string;
  name: string;
  folderId: string | null;
  userId: string;
};

type UploadFileProps = {
  filePath: string;
  file: File;
  folderId: string | null;
  userId: string;
};

export type GetChildFoldersProps = {
  parentId: string | null;
  userId: string;
  callbackFunc: (
    querySnapshot: QuerySnapshot<
      DocumentData,
      {
        [x: string]: any;
      }
    >
  ) => void;
};

export type GetChildFilesProps = {
  folderId: string | null;
  userId: string;
  callbackFunc: (
    querySnapshot: QuerySnapshot<
      DocumentData,
      {
        [x: string]: any;
      }
    >
  ) => void;
};

const methods = {
  uploadFile: async ({ filePath, file, folderId, userId }: UploadFileProps) => {
    const fileRef = ref(storage, filePath);
    const uploadTask = uploadBytesResumable(fileRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      () => {},
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        await methods.createDocument({
          folderId,
          name: file.name,
          url,
          userId,
        });
      }
    );
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

export const firebase = { ...methods };

import { initializeApp } from "firebase/app";

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

export type FirebaseFolder = {
  createdAt: Timestamp | null;
  name: string;
  id: string | null;
  parentId: string | null;
  path: any[];
  userId: string;
};

type CreateFolderProps = {
  name: string;
  parentId: string;
  userId: string;
  path: any[];
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

const methods = {
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
};

export const firebase = { ...methods };

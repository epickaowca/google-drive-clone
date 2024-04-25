import React, { FC, ReactNode, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import { db } from "../../../firebase";
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { FirebaseFolder, FirebaseFile } from "../types";
import { ROOT_FOLDER } from "../constants";

type ContextType = {
  getData: (folderId: string) => {
    folders: FirebaseFolder[];
    files: FirebaseFile[];
    currentFolder: FirebaseFolder;
  };
};

const Context = React.createContext<ContextType | null>(null);

export const useDrive = () => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error("useDrive context is undefined");
  } else {
    return context;
  }
};

export const DriveProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [user] = useAuthState(auth);
  const [allFiles, setAllFiles] = useState<FirebaseFile[] | null>(null);
  const [allFolders, setAllFolders] = useState<FirebaseFolder[] | null>(null);

  useEffect(() => {
    const unsubscribeFiles = onSnapshot(
      query(
        collection(db, "files"),
        where("userId", "==", user?.uid),
        orderBy("createdAt")
      ),
      (querySnapshot) => {
        const filesArr: FirebaseFile[] = [];
        querySnapshot.forEach((doc) => {
          filesArr.push({ id: doc.id, ...doc.data() } as FirebaseFile);
        });
        setAllFiles(filesArr);
      }
    );

    const unsubscribeFolders = onSnapshot(
      query(
        collection(db, "folders"),
        where("userId", "==", user?.uid),
        orderBy("createdAt")
      ),
      (querySnapshot) => {
        const foldersArr: FirebaseFolder[] = [];
        querySnapshot.forEach((doc) => {
          foldersArr.push({ id: doc.id, ...doc.data() } as FirebaseFolder);
        });
        setAllFolders(foldersArr);
      }
    );

    return () => {
      unsubscribeFiles();
      unsubscribeFolders();
    };
  }, []);

  const getData = (folderId: string) => {
    return {
      currentFolder:
        allFolders?.find(({ id }) => id === folderId) ?? ROOT_FOLDER,
      files: allFiles?.filter((file) => file.folderId === folderId) ?? [],
      folders:
        allFolders?.filter(({ parentId }) => parentId === folderId) ?? [],
    };
  };

  if (allFiles && allFolders) {
    return <Context.Provider value={{ getData }}>{children}</Context.Provider>;
  } else {
    return <h1>Loading...</h1>;
  }
};

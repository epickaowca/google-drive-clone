import React, { FC, ReactNode, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { FirebaseFolder, FirebaseFile } from "../types";
import { ROOT_FOLDER } from "../constants";
import { subscribe } from "./services";

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
    const unsubscribeFiles = subscribe("files", user!.uid, setAllFiles);
    const unsubscribeFolders = subscribe("folders", user!.uid, setAllFolders);

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

import { DriveProvider, ContextType } from "../../src/context";
import { FC, ReactNode } from "react";
import { FirebaseFile, FirebaseFolder } from "../../src/types";
import { userId } from "../constants";

export const fakeFolder: FirebaseFolder = {
  name: "fakeFolder",
  id: "fakeFolder",
  path: [{ id: "root", name: "Root" }],
  createdAt: null,
  parentId: "root",
  userId,
};

const fakeFile: FirebaseFile = {
  name: "fakeFile",
  id: "fakeFile",
  filePath: "fakeFilePath",
  url: "fakeUrl",
  createdAt: null,
  folderId: "root",
  userId,
};

const staticValue = {
  getData: (folderId: string) => {
    return {
      folders: [fakeFolder],
      files: [fakeFile],
      currentFolder: fakeFolder,
    };
  },
} as ContextType;

export const MockContext: FC<{ children?: ReactNode }> = ({ children }) => {
  return <DriveProvider staticValue={staticValue}>{children}</DriveProvider>;
};

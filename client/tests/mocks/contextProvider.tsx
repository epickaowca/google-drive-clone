import { DriveProvider, ContextType } from "../../src/context";
import { FC, ReactNode } from "react";
import { fakeFile, fakeFolder, fakeFolder2 } from "../constants";

const staticValue = {
  getData: (folderId: string) => {
    return {
      folders: [fakeFolder, fakeFolder2],
      files: [fakeFile],
      currentFolder: fakeFolder,
    };
  },
} as ContextType;

export const MockContext: FC<{ children?: ReactNode }> = ({ children }) => {
  return <DriveProvider staticValue={staticValue}>{children}</DriveProvider>;
};

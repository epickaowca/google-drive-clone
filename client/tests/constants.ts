import { FirebaseFile, FirebaseFolder } from "../src/types";

export const userId = "testUserId123";

export const fakeFolder: FirebaseFolder = {
  name: "fakeFolder",
  id: "fakeFolder",
  path: [{ id: "root", name: "Root" }],
  createdAt: null,
  parentId: "root",
  userId,
};

export const fakeFile: FirebaseFile = {
  name: "fakeFile",
  id: "fakeFile",
  filePath: "fakeFilePath",
  url: "fakeUrl",
  createdAt: null,
  folderId: "root",
  userId,
};

import { FirebaseFile, FirebaseFolder } from "../src/types";

export const userId = "testUserId123";

export const fakeFolder: FirebaseFolder = {
  name: "FakeFolder",
  id: "fakeFolder",
  path: [{ id: "root", name: "Root" }],
  createdAt: null,
  parentId: "root",
  userId,
};

export const fakeFolder2: FirebaseFolder = {
  name: "FakeFolder2",
  id: "fakeFolder2",
  path: [
    { id: "root", name: "Root" },
    { id: "fakeFolder", name: "FakeFolder" },
  ],
  createdAt: null,
  parentId: "fakeFolder",
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

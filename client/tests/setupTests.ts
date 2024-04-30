import "@testing-library/jest-dom";
import { userId, email } from "./constants";
import { ROOT_FOLDER } from "../src/constants";
import { fakeFolder, fakeFolder2, fakeFile } from "./constants";

jest.mock("react-firebase-hooks/auth", () => ({
  ...jest.requireActual("react-firebase-hooks/auth"),
  useAuthState: jest.fn(() => [{ uid: userId, email }, false, false]),
}));

jest.mock("../src/firebase", () => ({
  db: jest.fn(),
  auth: jest.fn(),
  storage: jest.fn(),
}));

jest.mock("../src/context/services", () => ({
  subscribe: jest.fn(() => () => {}),
}));

jest.mock("../src/services", () => ({
  getSizeMeasurementFile: jest.fn(() => Promise.resolve({ diskSpaceUsed: 0 })),
  updateSizeMeasurementFile: jest.fn(),
  createSizeMeasurementFile: jest.fn(),
}));

jest.mock("../src/context", () => ({
  ...jest.requireActual("../src/context"),
  useDrive: jest.fn((folderId: string = ROOT_FOLDER.id) => {
    const folderList = [fakeFolder, fakeFolder2];
    const currentFolder = folderId
      ? folderList.find((folder) => folder.id === folderId)
      : ROOT_FOLDER;
    const files = [fakeFile].filter((file) => file.folderId === folderId);
    const folders = folderList.filter((folder) => folder.parentId === folderId);

    return {
      currentFolder,
      files,
      folders,
    };
  }),
}));

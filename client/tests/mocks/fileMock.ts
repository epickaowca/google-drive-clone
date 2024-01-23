import {
  FirebaseFolder,
  GetQueryCB,
} from "../../src/features/google-drive/types";

export const fakeFolder: FirebaseFolder = {
  createdAt: null,
  name: "fakeFoldergregre",
  id: "fakeFolderIdt432fre",
  parentId: "dewfr43freg43r",
  path: [],
  userId: "user123",
};

export const sendEmail = jest.fn(async () => {
  return "success";
});

export const createFolder = jest.fn(async () => {});

export const getSizeMeasurementFile = jest.fn(async () => {
  return {
    diskSpaceUsed: 6500000,
  };
});

export const getChildFolders = jest.fn(
  async ({ parentId, userId, callbackFunc }) => {}
);

export const uploadFile = jest.fn(async () => {});

export const removeFile = jest.fn(async () => {});

export const getFolderById = jest.fn(async (folderId) => {
  return new Promise((resolve, reject) => {
    resolve({ ...fakeFolder, id: folderId });
  });
});

export const getChildFiles = jest.fn(async () => {});

export const removeFolder = jest.fn(async () => {});

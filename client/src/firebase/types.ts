import { UploadTaskSnapshot } from "firebase/storage";
import { Timestamp, QuerySnapshot, DocumentData } from "firebase/firestore";

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

export type CreateFolderProps = {
  name: string;
  parentId: string | null;
  userId: string;
  path: any[];
};

export type CreateDocumentProps = {
  url: string;
  name: string;
  folderId: string | null;
  userId: string;
};

export type UploadFileProps = {
  filePath: string;
  file: File;
  folderId: string | null;
  userId: string;
  uploadTaskCB: (snapshot: UploadTaskSnapshot) => void;
  finishCB: () => void;
  errorCB: () => void;
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

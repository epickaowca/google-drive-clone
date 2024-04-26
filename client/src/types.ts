import { Timestamp } from "firebase/firestore";
import { UploadTaskSnapshot } from "firebase/storage";

export type FirebaseFolder = {
  createdAt: Timestamp | null;
  name: string;
  id: string;
  parentId: string | null;
  path: { id: string | null; name: string }[] | [];
  userId: string;
};

export type FirebaseFile = {
  id: string;
  createdAt: Timestamp | null;
  folderId: string | null;
  name: string;
  url: string;
  userId: string;
  filePath: string;
};

export type UploadTaskCB = (snapshot: UploadTaskSnapshot) => void;

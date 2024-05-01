import { Timestamp } from "firebase/firestore";

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

import { Timestamp, QuerySnapshot, DocumentData } from "firebase/firestore";
import { UploadTaskSnapshot } from "firebase/storage";

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

export type GetQueryCB = (
  querySnapshot: QuerySnapshot<
    DocumentData,
    {
      [x: string]: any;
    }
  >
) => void;

export type UploadTaskCB = (snapshot: UploadTaskSnapshot) => void;

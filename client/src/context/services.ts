import { db } from "@root/firebase";
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";

export const subscribe = (
  docsType: "files" | "folders",
  id: string,
  setData: (args: any[]) => void
) =>
  onSnapshot(
    query(
      collection(db, docsType),
      where("userId", "==", id),
      orderBy("createdAt")
    ),
    (docs) => {
      const filesArr: any = [];
      docs.forEach((doc) => {
        filesArr.push({ id: doc.id, ...doc.data() });
      });
      setData(filesArr);
    }
  );

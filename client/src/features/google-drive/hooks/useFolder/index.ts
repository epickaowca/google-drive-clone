import { useReducer, useEffect } from "react";
import { GetQueryCB, FirebaseFile, FirebaseFolder } from "../../types";
import { userId } from "../../../authentication/index";
import { reducer, ActionType } from "./reducer";
import {
  getFolderById,
  getChildFolders,
  getChildFiles,
} from "../../services/firestore";

type UseFolderProps = {
  folderId?: string | null;
  folder?: FirebaseFolder | null;
};

export function useFolder({ folderId = null, folder = null }: UseFolderProps) {
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  });

  useEffect(
    function selectFolder() {
      dispatch({
        type: ActionType.SELECT_FOLDER,
        payload: { folder, folderId },
      });
    },
    [folderId, folder]
  );

  useEffect(
    function setCurrentFolder() {
      if (folderId == null) {
        return dispatch({
          type: ActionType.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        });
      } else {
        getFolderById(folderId)
          .then((folder) => {
            dispatch({
              type: ActionType.UPDATE_FOLDER,
              payload: { folder },
            });
          })
          .catch((err) => {
            dispatch({
              type: ActionType.UPDATE_FOLDER,
              payload: { folder: ROOT_FOLDER },
            });
          });
      }
    },
    [folderId]
  );

  useEffect(
    function setChildFolders() {
      const callbackFunc: GetQueryCB = (querySnapshot) => {
        const docArr: FirebaseFolder[] = [];
        querySnapshot.forEach((doc) => {
          const formattedDoc = {
            id: doc.id,
            ...doc.data(),
          } as FirebaseFolder;
          docArr.push(formattedDoc);
        });
        dispatch({
          type: ActionType.SET_CHILD_FOLDERS,
          payload: { childFolders: docArr },
        });
      };

      return getChildFolders({
        userId,
        parentId: folderId,
        callbackFunc,
      });
    },
    [folderId]
  );

  useEffect(
    function setChildFiles() {
      const callbackFunc: GetQueryCB = (querySnapshot) => {
        const docArr: FirebaseFile[] = [];
        querySnapshot.forEach((doc) => {
          const formattedDoc = {
            ...doc.data(),
          } as FirebaseFile;
          docArr.push(formattedDoc);
        });
        dispatch({
          type: ActionType.SET_CHILD_FILES,
          payload: { childFiles: docArr },
        });
      };

      return getChildFiles({
        userId,
        folderId,
        callbackFunc,
      });
    },
    [folderId]
  );

  return state;
}

export const ROOT_FOLDER: FirebaseFolder = {
  name: "Root",
  id: null,
  path: [],
  createdAt: null,
  parentId: "",
  userId: "",
};

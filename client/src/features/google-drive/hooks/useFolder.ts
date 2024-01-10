import { useReducer, useEffect } from "react";
import {
  firebase,
  FirebaseFolder,
  GetChildFoldersProps,
  GetChildFilesProps,
  FirebaseFile,
} from "../../../firebase";
import { userId } from "../../authentication/index";

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
        firebase.firestore
          .getFolderById(folderId)
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
      const callbackFunc: GetChildFoldersProps["callbackFunc"] = (
        querySnapshot
      ) => {
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

      return firebase.firestore.getChildFolders({
        userId,
        parentId: folderId,
        callbackFunc,
      });
    },
    [folderId]
  );

  useEffect(
    function setChildFiles() {
      const callbackFunc: GetChildFilesProps["callbackFunc"] = (
        querySnapshot
      ) => {
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

      return firebase.firestore.getChildFiles({
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

function reducer(
  state: {
    folderId: any;
    folder: FirebaseFolder | null;
    childFolders: FirebaseFolder[] | [];
    childFiles: FirebaseFile[] | [];
  },
  { type, payload }: Action
) {
  switch (type) {
    case ActionType.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFiles: [],
        childFolders: [],
      };
    case ActionType.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      };
    case ActionType.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolders,
      };
    case ActionType.SET_CHILD_FILES:
      return {
        ...state,
        childFiles: payload.childFiles,
      };
    default:
      return state;
  }
}

enum ActionType {
  SELECT_FOLDER = "USE_FOLDER/SELECT_FOLDER",
  UPDATE_FOLDER = "USE_FOLDER/UPDATE_FOLDER",
  SET_CHILD_FOLDERS = "USE_FOLDER/SET_CHILD_FOLDERS",
  SET_CHILD_FILES = "USE_FOLDER/SET_CHILD_FILES",
}

type SelectFolder = {
  type: ActionType.SELECT_FOLDER;
  payload: { folderId: string | null; folder: FirebaseFolder | null };
};

type UpdateFolder = {
  type: ActionType.UPDATE_FOLDER;
  payload: { folder: FirebaseFolder | null };
};

type SetChildFolders = {
  type: ActionType.SET_CHILD_FOLDERS;
  payload: { childFolders: FirebaseFolder[] | [] };
};

type SetChildFiles = {
  type: ActionType.SET_CHILD_FILES;
  payload: { childFiles: FirebaseFile[] | [] };
};

type Action = SelectFolder | UpdateFolder | SetChildFolders | SetChildFiles;

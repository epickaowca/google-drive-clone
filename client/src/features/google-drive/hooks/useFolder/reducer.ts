import { FirebaseFolder, FirebaseFile } from "../../types";

export function reducer(
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

export enum ActionType {
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

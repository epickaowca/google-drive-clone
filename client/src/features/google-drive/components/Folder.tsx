import { FC } from "react";
import { FirebaseFolder } from "../../../firebase";

type FolderProps = {
  folder: FirebaseFolder;
};

export const Folder: FC<FolderProps> = ({ folder }) => {
  return <div>{folder.name}</div>;
};

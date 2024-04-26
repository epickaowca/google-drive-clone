import { FC } from "react";
import { FirebaseFolder } from "../../../types";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ROOT_FOLDER } from "../../../constants";

type BreadcrumbsProps = {
  currentFolder: FirebaseFolder;
};

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ currentFolder }) => {
  let path: FirebaseFolder["path"] = [];
  if (currentFolder) {
    path = [
      ...path,
      ...currentFolder.path,
      { name: currentFolder.name, id: currentFolder.id },
    ];
  }
  if (path.length === 0) {
    path = [{ name: ROOT_FOLDER.name, id: ROOT_FOLDER.id }];
  }

  return (
    <Breadcrumb className="flex-grow-1" listProps={{ className: "m-0" }}>
      {path.map((folder, index) => {
        return (
          <Breadcrumb.Item
            active={index === path.length - 1}
            key={folder.id}
            linkAs={Link}
            linkProps={{ to: folder.id ? `/folder/${folder.id}` : "/" }}
            className="d-inline-block"
            style={{ maxWidth: "150px" }}
          >
            {folder.name}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

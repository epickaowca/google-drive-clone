import { FC } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDrive } from "../../../context";

export const Breadcrumbs: FC = () => {
  const { currentFolder } = useDrive();
  const { name, id, path: folderPath } = currentFolder;
  const path = [...folderPath, { name, id }];

  return (
    <Breadcrumb className="flex-grow-1" listProps={{ className: "m-0" }}>
      {path.map(({ id, name }, index) => {
        return (
          <Breadcrumb.Item
            active={index === path.length - 1}
            key={id}
            linkAs={Link}
            linkProps={{ to: `/folder/${id}` }}
            className="d-inline-block"
            style={{ maxWidth: "150px" }}
          >
            {name}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

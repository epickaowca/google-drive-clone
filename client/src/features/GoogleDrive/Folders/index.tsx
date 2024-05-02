import { FC } from "react";
import { Folder } from "./components/Folder";
import { useDrive } from "@root/context";

export const Folders: FC = () => {
  const { folders } = useDrive();

  return (
    <>
      {folders.length > 0 && (
        <div className="d-flex flex-wrap">
          {folders.map((folder) => (
            <div key={folder.id} style={{ maxWidth: "200px" }} className="p-2">
              <Folder folder={folder} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

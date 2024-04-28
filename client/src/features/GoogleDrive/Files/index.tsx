import { FC } from "react";
import { useDrive } from "../../../context";
import { File } from "./components/File";

export const Files: FC = () => {
  const { files } = useDrive();

  return (
    <>
      {files.length > 0 && (
        <div className="d-flex flex-wrap">
          {files.map((file) => (
            <div key={file.id} style={{ maxWidth: "200px" }} className="p-2">
              <File file={file} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

import { FC } from "react";
import { useParams } from "react-router-dom";
import { useDrive } from "../../../context";
import { File } from "./components/File";

export const Files: FC = () => {
  const { folderId } = useParams();
  const { getData } = useDrive();
  const { files } = getData(folderId || "root");

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

import { FC, useState } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidV4 } from "uuid";
import { FileToast } from "./components/FileToast";
import { useEvent } from "@owcaofficial/web-analytics";

export const AddFile: FC = () => {
  const sendEvent = useEvent();
  const [uploadingFiles, setUploadingFiles] = useState<
    { id: string; file: File }[]
  >([]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const id = uuidV4();
    const file = e.target.files[0];
    setUploadingFiles((prev) => [...prev, { id, file }]);
    e.target.value = "";
    sendEvent("add_file_action", "add_file");
  };

  return (
    <>
      <label
        htmlFor="file_input"
        className="btn btn-outline-success btn-lg m-0 me-2"
      >
        <FontAwesomeIcon icon={faFileUpload} />
        <input
          id="file_input"
          type="file"
          onChange={handleUpload}
          style={{ opacity: 0, position: "absolute", left: "-9999px" }}
        />
      </label>

      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div className="position-fixed end-0 bottom-0 m-5 me-2 mw-100">
            {uploadingFiles.map(({ file, id }) => (
              <FileToast
                onClose={() =>
                  setUploadingFiles((prev) =>
                    prev.filter((item) => item.id !== id)
                  )
                }
                key={id}
                id={id}
                file={file}
              />
            ))}
          </div>,
          document.body
        )}
    </>
  );
};

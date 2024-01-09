import { FC } from "react";
import { FirebaseFolder, firebase } from "../../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { userId } from "../../authentication/index";

type AddFileBtnProps = {
  currentFolder: FirebaseFolder;
};

export const AddFileBtn: FC<AddFileBtnProps> = ({ currentFolder }) => {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    const filePath =
      currentFolder.path.length > 0
        ? `${currentFolder.path.map((e) => e.name).join("/")}/${file.name}`
        : `Root/${file.name}`;
    const fullPath = `/files/${userId}/${filePath}`;

    await firebase.uploadFile({
      filePath: fullPath,
      file,
      folderId: currentFolder.id,
      userId,
    });
  };
  return (
    <label className="btn btn-outline-success btn-lg m-0 me-2">
      <FontAwesomeIcon icon={faFileUpload} />
      <input
        type="file"
        onChange={handleUpload}
        style={{ opacity: 0, position: "absolute", left: "-9999px" }}
      />
    </label>
  );
};

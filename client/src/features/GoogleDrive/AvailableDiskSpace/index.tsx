import { FC, useEffect, useState } from "react";
import { getSizeMeasurementFile } from "../../../services";
import { FirebaseFile } from "../../../types";

type AvailableDiskSpaceProps = {
  userId: string;
  childFiles: [] | FirebaseFile[];
};

export const AvailableDiskSpace: FC<AvailableDiskSpaceProps> = ({
  userId,
  childFiles,
}) => {
  const [size, setSize] = useState(0);
  useEffect(() => {
    getSizeMeasurementFile(userId).then((data) => {
      setSize(data.diskSpaceUsed);
    });
  }, [childFiles, userId]);

  return (
    <span
      style={{
        position: "absolute",
        top: "-15px",
        color: "rgba(33, 37, 41, 0.75)",
      }}
    >
      {bytesToMb(size)}Mb/20Mb
    </span>
  );
};

export const bytesToMb = (bytes: number) => {
  return (bytes / (1024 * 1024)).toFixed(2);
};

// 20Mb
export const MAX_SPACE_IN_BYTES = 20000000;

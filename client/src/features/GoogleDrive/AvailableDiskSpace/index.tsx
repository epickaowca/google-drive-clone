import { FC, useEffect, useState } from "react";
import { getSizeMeasurementFile } from "../../../services";
import { bytesToMb } from "./utils";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import { useDrive } from "../../../context";

export const AvailableDiskSpace: FC = () => {
  const [size, setSize] = useState(0);
  const [user] = useAuthState(auth);
  const userId = user!.uid;
  const { files } = useDrive();

  useEffect(() => {
    getSizeMeasurementFile(userId).then((data) => {
      setSize(data.diskSpaceUsed);
    });
  }, [files, userId]);

  return (
    <span
      style={{
        position: "absolute",
        top: "-15px",
        color: "rgba(33, 37, 41, 0.75)",
      }}
    >
      {bytesToMb(size)} / 20Mb
    </span>
  );
};

// 20Mb
export const MAX_SPACE_IN_BYTES = 20971520;

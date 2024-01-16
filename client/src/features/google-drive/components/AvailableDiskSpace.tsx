import { FC, useEffect, useState } from "react";
import { getSizeMeasurementFile } from "../services/firestore";

type AvailableDiskSpaceProps = {
  userId: string;
};

export const AvailableDiskSpace: FC<AvailableDiskSpaceProps> = ({ userId }) => {
  const [size, setSize] = useState(0);
  useEffect(() => {
    getSizeMeasurementFile(userId).then((data) => {
      setSize(data.diskSpaceUsed);
    });
  }, []);

  return <div>{(size / (1024 * 1024)).toFixed(2)}Mb/20Mb</div>;
};

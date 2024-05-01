import { FC } from "react";
import { Container } from "react-bootstrap";
import {
  AvailableDiskSpace,
  Folders,
  Files,
  AddFile,
  AddFolder,
  Navbar,
  Breadcrumbs,
} from "../../features/GoogleDrive";
import { useDrive } from "../../context";
import { DriveProvider } from "../../context";

export const Home: FC = () => {
  return (
    <DriveProvider>
      <Dashboard />
    </DriveProvider>
  );
};

const Dashboard: FC = () => {
  const { files, folders } = useDrive();

  return (
    <>
      <Navbar />
      <Container className="mt-4">
        <div className="d-flex align-items-center mb-5 position-relative">
          <AvailableDiskSpace />
          <Breadcrumbs />
          <AddFile />
          <AddFolder />
        </div>

        <Folders />
        {files.length > 0 && folders.length > 0 && <hr />}
        <Files />
      </Container>
    </>
  );
};

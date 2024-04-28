import { screen, waitFor } from "@testing-library/react";
import { FileToast } from "./FileToast";
import { fileExists, createFile } from "../services";
import { uploadBytesResumable } from "./constants";
import { render } from "../../../../../tests/render";
import { UploadTask } from "firebase/storage";
import { userId } from "../../../../../tests/constants";
import { fakeFolder } from "../../../../../tests/mocks/contextProvider";
import { downloadUrl } from "./__mocks__/constants";

jest.useFakeTimers();
jest.mock("../services");
jest.mock("./constants");
jest.mock("../../../../services");

const mockedUploadBytesResumable = uploadBytesResumable as jest.Mock<
  any,
  any,
  any
>;
const mockedCreateFile = createFile as jest.Mock<any, any, any>;
const mockedFileExists = fileExists as jest.Mock<any, any, any>;

const file = new File([""], "filename");

const fileObj = {
  file,
  id: "",
  onClose: jest.fn(),
};

const uploadBytesMockHelper = (p: "progress" | "error" | "finish") =>
  mockedUploadBytesResumable.mockImplementation(
    () =>
      ({
        snapshot: { ref: {} },
        on: (
          state: string,
          progress: (p: any) => void,
          error: () => void,
          finish: () => void
        ) => {
          p === "error"
            ? error()
            : p === "finish"
            ? finish()
            : progress({ bytesTransferred: 50, totalBytes: 100 });
        },
      } as UploadTask)
  );

it("displays error: File already exists", async () => {
  mockedFileExists.mockResolvedValue(true);
  render(<FileToast {...fileObj} />);
  await waitFor(() =>
    expect(screen.getByRole("alert")).toHaveTextContent(
      "file already exists in this directory"
    )
  );
  jest.runAllTimers();
  expect(fileObj.onClose).toHaveBeenCalled();
});

it("displays error: Maximum disk space usage exceeded", async () => {
  const file = new File([new ArrayBuffer(25000000)], "hello.png", {
    type: "image/png",
  });
  const fileObj = {
    file,
    id: "",
    onClose: jest.fn(),
  };
  mockedFileExists.mockResolvedValue(false);
  render(<FileToast {...fileObj} />);
  await waitFor(() =>
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Maximum disk space usage exceeded"
    )
  );
  jest.runAllTimers();
  expect(fileObj.onClose).toHaveBeenCalled();
});

it("displays error: error uploading file", async () => {
  mockedFileExists.mockResolvedValue(false);
  uploadBytesMockHelper("error");
  render(<FileToast {...fileObj} />);
  await waitFor(() =>
    expect(screen.getByRole("alert")).toHaveTextContent(
      `${fileObj.file.name}error uploading file`
    )
  );
  jest.runAllTimers();
  expect(fileObj.onClose).toHaveBeenCalled();
});

it("displays progress bar", async () => {
  mockedFileExists.mockResolvedValue(false);
  uploadBytesMockHelper("progress");
  render(<FileToast {...fileObj} />);
  await waitFor(() =>
    expect(screen.getByRole("alert")).toHaveTextContent("50%")
  );
});

it("displays toast success and calls createFile", async () => {
  mockedFileExists.mockResolvedValue(false);
  uploadBytesMockHelper("finish");
  render(<FileToast {...fileObj} />);
  expect(screen.getByRole("alert")).toHaveTextContent(`${file.name}0%`);
  await waitFor(() =>
    expect(mockedCreateFile).toHaveBeenCalledWith({
      url: downloadUrl,
      name: fileObj.file.name,
      folderId: fakeFolder.id,
      userId: userId,
      filePath: "/files/testUserId123/Root/fakeFolder/filename",
      size: 0,
    })
  );
  expect(fileObj.onClose).toHaveBeenCalled();
});

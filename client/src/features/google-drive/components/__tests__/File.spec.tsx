import { File } from "../File";
import { render, screen, act } from "@testing-library/react";
import { FirebaseFile } from "../../types";
import { removeFile } from "../../../../../tests/mocks/fileMock";

const userId = "user123";

const fakeFile: FirebaseFile = {
  createdAt: null,
  filePath: "fakePath",
  folderId: "",
  id: "ewf43grwe",
  name: "cotton.png",
  url: "fakeUrl.png",
  userId,
};

it("renders File with correct url", async () => {
  render(<File userId={userId} file={fakeFile} />);
  const anchor = screen.getByRole("link");
  await expect(anchor).toHaveAttribute("href", fakeFile.url);
});

it("removes file", async () => {
  const { rerender } = render(<File userId={userId} file={fakeFile} />);
  const btn = screen.getByRole("button");
  await act(async () => {
    await btn.click();
  });
  rerender(<File userId={userId} file={fakeFile} />);
  const dialog = screen.getByRole("dialog");
  const removeBtn = screen.getByText("Remove");
  expect(dialog).toBeInTheDocument();
  await act(async () => {
    await removeBtn.click();
  });
  expect(removeFile).toHaveBeenCalledWith({
    fileId: fakeFile.id,
    filePath: fakeFile.filePath,
    userId,
  });
});

import { screen, render, act, fireEvent } from "@testing-library/react";
import { AddFolderBtn } from "../AddFolderBtn";
import { ROOT_FOLDER } from "../../constants";
import { createFolder } from "../../../../../tests/mocks/fileMock";

const userId = "user123";

it("calls createFolder function", async () => {
  const folderName = "folder Name";
  const { rerender } = render(
    <AddFolderBtn currentFolder={ROOT_FOLDER} userId={userId} />
  );
  const button = screen.getByRole("button");

  await act(async () => {
    await button.click();
  });
  rerender(<AddFolderBtn currentFolder={ROOT_FOLDER} userId={userId} />);
  const dialog = screen.getByRole("dialog");
  expect(dialog).toBeInTheDocument();
  const input = screen.getByLabelText("Folder Name");
  const addFolderBtn = screen.getByText("Add Folder");

  await fireEvent.change(input, { target: { value: folderName } });
  await act(async () => {
    await addFolderBtn.click();
  });
  rerender(<AddFolderBtn currentFolder={ROOT_FOLDER} userId={userId} />);
  expect(createFolder).toHaveBeenCalledWith({
    name: folderName,
    parentId: ROOT_FOLDER.id,
    userId,
    path: [{ name: ROOT_FOLDER.name, id: ROOT_FOLDER.id }],
  });
  expect(dialog).not.toBeInTheDocument();
  expect(input).toHaveValue("");
});

it("closes dialog after clicking on cancel btn", async () => {
  const { rerender } = render(
    <AddFolderBtn currentFolder={ROOT_FOLDER} userId={userId} />
  );
  const button = screen.getByRole("button");

  await act(async () => {
    await button.click();
  });
  rerender(<AddFolderBtn currentFolder={ROOT_FOLDER} userId={userId} />);
  const dialog = screen.getByRole("dialog");
  expect(dialog).toBeInTheDocument();
  const closeBtn = screen.getByText("Close");
  await act(async () => {
    await closeBtn.click();
  });
  rerender(<AddFolderBtn currentFolder={ROOT_FOLDER} userId={userId} />);
  expect(dialog).not.toBeInTheDocument();
});

it("doesn't calls createFolder function if folderName is empty", async () => {
  const { rerender } = render(
    <AddFolderBtn currentFolder={ROOT_FOLDER} userId={userId} />
  );
  const button = screen.getByRole("button");

  await act(async () => {
    await button.click();
  });
  rerender(<AddFolderBtn currentFolder={ROOT_FOLDER} userId={userId} />);
  const dialog = screen.getByRole("dialog");
  expect(dialog).toBeInTheDocument();
  const addFolderBtn = screen.getByText("Add Folder");

  await act(async () => {
    await addFolderBtn.click();
  });
  rerender(<AddFolderBtn currentFolder={ROOT_FOLDER} userId={userId} />);
  expect(createFolder).not.toHaveBeenCalledWith({
    name: "",
    parentId: ROOT_FOLDER.id,
    userId,
    path: [{ name: ROOT_FOLDER.name, id: ROOT_FOLDER.id }],
  });
  expect(dialog).toBeInTheDocument();
});

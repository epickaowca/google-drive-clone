import { screen, act, waitFor, fireEvent } from "@testing-library/react";
import { render } from "../../../../tests/render";
import { AddFolder } from "./index";
import { createFolder } from "./services";
import { fakeFolder } from "../../../../tests/constants";
import { userId } from "../../../../tests/constants";

jest.mock("./services");

const mockedCreateFolder = createFolder as jest.Mock<any, any, any>;
const folderName = "FolderName";

it("clicking cancel button - hides dialog", async () => {
  render(<AddFolder />);
  await screen.getByRole("button", { name: "add folder" }).click();
  const dialog = screen.getByRole("dialog");
  expect(dialog).toBeInTheDocument();

  await screen.getByRole("button", { name: "Close" }).click();
  await waitFor(() => expect(dialog).not.toBeInTheDocument());
  expect(mockedCreateFolder).not.toHaveBeenCalledWith();
});

it("submitting form - calls createFolder", async () => {
  render(<AddFolder />);
  await screen.getByRole("button", { name: "add folder" }).click();
  const dialog = screen.getByRole("dialog");
  await waitFor(async () => {
    expect(dialog).toBeInTheDocument();
  });

  fireEvent.change(screen.getByRole("textbox", { name: "Folder Name" }), {
    target: { value: folderName },
  });
  await screen.getByRole("button", { name: "Add Folder" }).click();
  expect(mockedCreateFolder).toHaveBeenCalledWith({
    name: folderName,
    parentId: "root",
    userId,
    path: [{ id: "root", name: "Root" }],
  });
  await waitFor(async () => expect(dialog).not.toBeInTheDocument());
});

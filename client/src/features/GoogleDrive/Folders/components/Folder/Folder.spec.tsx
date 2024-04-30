import { screen } from "@testing-library/react";
import { render } from "../../../../../../tests/render";
import { Folder } from "./index";
import { fakeFolder, fakeFolder2 } from "../../../../../../tests/constants";
import { removeFolder } from "../../services";

const mockedRemoveFolder = removeFolder as jest.Mock<any>;

jest.mock("../../services");

it("displays folder icon", () => {
  render(<Folder folder={fakeFolder} />);
  expect(screen.getByText(fakeFolder.name)).toBeInTheDocument();
  expect(screen.getByRole("link")).toHaveAttribute(
    "href",
    `/folder/${fakeFolder.id}`
  );
});

it("confirming dialog calls removeFolder", async () => {
  render(<Folder folder={fakeFolder2} />);
  await screen.getByRole("button", { name: "remove folder" }).click();

  await screen.getByRole("button", { name: "Remove" }).click();
  expect(mockedRemoveFolder).toHaveBeenCalledWith(fakeFolder2.id);
});

it("displays error if folder is not empty", async () => {
  render(<Folder folder={fakeFolder} />);
  await screen.getByRole("button", { name: "remove folder" }).click();

  const dialogInfo = screen.getByText("folder must be empty");
  expect(dialogInfo).toBeInTheDocument();
  await screen.getByRole("button", { name: "OK" }).click();
  expect(dialogInfo).not.toBeInTheDocument();
  expect(mockedRemoveFolder).not.toHaveBeenCalledWith(fakeFolder2.id);
});

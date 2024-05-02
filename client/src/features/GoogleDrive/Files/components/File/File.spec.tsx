import { act, screen, waitFor } from "@testing-library/react";
import { render } from "@tests/render";
import { File } from "./index";
import { userId, fakeFile } from "@tests/constants";

import { removeFile } from "../../services";
const mockedRemoveFile = removeFile as jest.Mock<any>;

jest.mock("../../services", () => ({
  removeFile: jest.fn(),
}));

it("displays file icon", () => {
  render(<File file={fakeFile} />);
  expect(screen.getByText(fakeFile.name)).toBeInTheDocument();
  expect(screen.getByRole("link")).toHaveAttribute("href", fakeFile.url);
});

it("calls remove file after confirming dialog", async () => {
  render(<File file={fakeFile} />);
  const button = screen.getByRole("button", { name: "remove file" });
  await button.click();

  await waitFor(async () => {
    expect(
      screen.getByText(`Are you sure you want to delete ${fakeFile.name}?`)
    ).toBeInTheDocument();
  });
  await act(async () => {
    await screen.getByRole("button", { name: "Remove" }).click();
  });
  expect(mockedRemoveFile).toHaveBeenCalledWith({
    fileId: fakeFile.id,
    filePath: fakeFile.filePath,
    userId,
  });
});

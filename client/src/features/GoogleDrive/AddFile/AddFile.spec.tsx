import { screen, act, queryByAttribute } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { AddFile } from "./index";
import { render } from "@tests/render";

const FileToastProps = jest.fn();
jest.mock("./components/FileToast", () => ({
  FileToast: jest.fn((props) => FileToastProps(props)),
}));

it("displays toast after adding file to input", async () => {
  const file = new File([""], "filename");
  const { container } = render(<AddFile />);
  const getById = queryByAttribute.bind(null, "id");
  const fileInput = getById(container, "file_input");
  await act(async () => {
    await userEvent.upload(fileInput!, file);
  });

  expect(FileToastProps).toHaveBeenCalledWith(
    expect.objectContaining({
      file,
    })
  );
  expect(fileInput).toHaveValue("");
});

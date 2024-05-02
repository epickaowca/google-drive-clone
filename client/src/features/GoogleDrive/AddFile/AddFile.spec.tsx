import { screen, act, queryByAttribute } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { AddFile } from "./index";
import { render } from "@tests/render";

jest.mock("./components/FileToast", () => ({
  FileToast: jest.fn(({ file }: { file: File }) => <div>{file.name}</div>),
}));

it("displays toast after adding file to input", async () => {
  const file = new File([""], "filename");
  const { container } = render(<AddFile />);
  const getById = queryByAttribute.bind(null, "id");
  const fileInput = getById(container, "file_input");
  await act(async () => {
    await userEvent.upload(fileInput!, file);
  });

  expect(screen.getByText(file.name)).toBeInTheDocument();
  expect(fileInput).toHaveValue("");
});

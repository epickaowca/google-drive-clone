import { screen, act, queryByAttribute } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { AddFile } from "./index";
import { render } from "../../../../tests/render";

jest.mock("./services");
jest.mock("./components/constants");
jest.mock("../../../services");

it("displays toast after adding file to input", async () => {
  const file = new File([""], "filename");
  const { container } = render(<AddFile />);
  const getById = queryByAttribute.bind(null, "id");
  const fileInput = getById(container, "file_input");

  await act(async () => {
    await userEvent.upload(fileInput!, file);
  });
  const alert = screen.getByRole("alert");
  expect(alert).toBeInTheDocument();
  expect(alert).toHaveTextContent(`${file.name}0%`);
  expect(fileInput).toHaveValue("");
});

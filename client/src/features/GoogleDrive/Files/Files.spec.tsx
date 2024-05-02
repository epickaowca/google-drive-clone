import { screen } from "@testing-library/react";
import { render } from "@tests/render";
import { fakeFile } from "@tests/constants";
import { Files } from "./index";

it("displays files", () => {
  render(<Files />);
  expect(screen.getByText(fakeFile.name)).toBeInTheDocument();
});

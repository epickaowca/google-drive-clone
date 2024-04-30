import { render } from "../../../../tests/render";
import { Folders } from "./index";
import { fakeFolder } from "../../../../tests/constants";
import { screen } from "@testing-library/dom";

it("displays folderList", () => {
  render(<Folders />);
  expect(screen.getByText(fakeFolder.name)).toBeInTheDocument();
});

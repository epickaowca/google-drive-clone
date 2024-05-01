import { render } from "../../../tests/render";
import { SpinLoader } from "./index";
import { screen } from "@testing-library/react";

it("displays spin loader", () => {
  render(<SpinLoader />);
  expect(screen.getByLabelText("Loading...")).toBeInTheDocument();
});

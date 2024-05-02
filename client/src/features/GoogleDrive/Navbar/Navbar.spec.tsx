import { Navbar } from "./index";
import { render } from "@tests/render";
import { screen } from "@testing-library/dom";
import { email } from "@tests/constants";

it("displays user email", () => {
  render(<Navbar />);
  expect(screen.getByText(email)).toBeInTheDocument();
});

it("displays profile link", () => {
  render(<Navbar />);
  expect(screen.getByText("Profile")).toHaveAttribute("href", "/profile");
});

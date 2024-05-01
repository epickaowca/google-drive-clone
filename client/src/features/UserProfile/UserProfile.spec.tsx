import { screen } from "@testing-library/react";
import { render } from "../../../tests/render";
import { email } from "../../../tests/constants";
import { UserProfile } from "./index";
import { signOut } from "firebase/auth";

const mockedSingOut = signOut as jest.Mock<any>;

jest.mock("firebase/auth", () => ({ signOut: jest.fn() }));

it("displays user email", () => {
  render(<UserProfile />);
  expect(screen.getByText(email)).toBeInTheDocument();
});

it("displays Go back Home link", () => {
  render(<UserProfile />);
  expect(screen.getByText("Go back to Home")).toHaveAttribute("href", "/");
});

it("calls logout on button click", () => {
  render(<UserProfile />);
  screen.getByRole("button", { name: "Logout" }).click();
  expect(mockedSingOut).toHaveBeenCalled();
});

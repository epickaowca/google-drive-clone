import { Auth } from "./index";
import { screen } from "@testing-library/react";
import { render } from "@tests/render";
import { useAuthState } from "react-firebase-hooks/auth";

const mockedUseAuthState = useAuthState as jest.Mock<any>;

jest.mock("./components/LoginForm", () => ({
  LoginForm: jest.fn(() => <h1>login form</h1>),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: jest.fn(({ to, replace }) => (
    <div>
      <h1>{to}</h1>
      <h1>{replace.toString()}</h1>
    </div>
  )),
}));

it("displays Navigate element with to and replace props", () => {
  render(<Auth />);
  expect(screen.getByText("/")).toBeInTheDocument();
  expect(screen.getByText("true")).toBeInTheDocument();
});

it("displays loading state", () => {
  mockedUseAuthState.mockReturnValue([{ uid: "", email: "" }, true, false]);
  render(<Auth />);
  expect(screen.getByText("Loading")).toBeInTheDocument();
});

it("displays login form", () => {
  mockedUseAuthState.mockReturnValue([undefined, false, false]);
  render(<Auth />);
  expect(screen.getByText("login form")).toBeInTheDocument();
});

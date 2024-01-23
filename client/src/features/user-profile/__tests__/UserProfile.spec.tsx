import { screen, render } from "@testing-library/react";
import { UserProfile } from "../index";

jest.mock("react-firebase-hooks/auth", () => {
  return {
    useAuthState: () => [{ email: "mockedemail@gmail.com" }, false, false],
  };
});

it("renders userProfile for a logged user", () => {
  render(<UserProfile />);

  const cos = screen.getByText("mockedemail@gmail.com");
  expect(cos).toBeInTheDocument();
});

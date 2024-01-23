import { Navbar } from "../Navbar";
import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

it("renders user email", () => {
  const user_email = "user@test.com";
  render(
    <MemoryRouter>
      <Navbar user_email={user_email} />
    </MemoryRouter>
  );
  expect(screen.getByText(user_email)).toBeInTheDocument();
});

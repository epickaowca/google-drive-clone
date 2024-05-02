import { LoginForm } from "./LoginForm";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { render } from "@tests/render";
import { sendEmail } from "../services/singIn";

const email = "email@gmail.com";
const mockedSendEmail = sendEmail as jest.Mock<any>;
jest.mock("../services/singIn");

it("submitting form calls sendEmail function", async () => {
  render(<LoginForm />);
  fireEvent.change(screen.getByPlaceholderText("example@gmail.com"), {
    target: { value: email },
  });
  screen.getByRole("button", { name: "Continue" }).click();

  await waitFor(async () => {
    expect(
      screen.getByText("We send You an link, please check Your email")
    ).toBeInTheDocument();
    expect(mockedSendEmail).toHaveBeenCalledWith({ email });
  });
});

it("displays error", async () => {
  mockedSendEmail.mockImplementationOnce(() => Promise.reject("error"));
  render(<LoginForm />);
  fireEvent.change(screen.getByPlaceholderText("example@gmail.com"), {
    target: { value: email },
  });
  screen.getByRole("button", { name: "Continue" }).click();

  await waitFor(async () => {
    expect(
      screen.getByText("something wrong, please try again in a few minutes")
    ).toBeInTheDocument();
    expect(mockedSendEmail).toHaveBeenCalledWith({ email });
  });
});

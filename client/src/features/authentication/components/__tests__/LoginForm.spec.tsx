import { render, screen, fireEvent, act } from "@testing-library/react";
import { LoginForm } from "../LoginForm";
import { sendEmail } from "../../../../../tests/mocks/fileMock";

it("shows send email message", async () => {
  const { rerender } = render(<LoginForm />);
  const input = screen.getByPlaceholderText("example@gmail.com");
  const submitBtn = screen.getByText("Continue");

  expect(input).toBeInTheDocument();
  fireEvent.change(input, {
    target: { value: "owcaofficial@yahoo.com" },
  });
  await act(async () => {
    await submitBtn.click();
  });
  rerender(<LoginForm />);
  const sendLinkInfo = screen.getByText(
    "We send You an link, please check Your email"
  );
  expect(sendLinkInfo).toBeInTheDocument();
  expect(sendEmail).toHaveBeenCalled();
});

import { Modal } from "../Modal";
import { screen } from "@testing-library/react";
import { render } from "@tests/render";

it("displays message and Remove button", () => {
  const message = "messageTest";
  render(<Modal onSubmit={jest.fn()} onClose={jest.fn()} message={message} />);
  expect(screen.getByText(message)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Remove" })).toBeInTheDocument();
});

it("displays error button", () => {
  render(
    <Modal
      message="messageTest"
      onSubmit={jest.fn()}
      onClose={jest.fn()}
      error={true}
    />
  );
  expect(screen.getByRole("button", { name: "OK" })).toBeInTheDocument();
});

it("clicking submit button calls onSubmit", async () => {
  const onSubmit = jest.fn();
  render(
    <Modal message="messageTest" onSubmit={onSubmit} onClose={jest.fn()} />
  );
  await screen.getByRole("button", { name: "Remove" }).click();
  expect(onSubmit).toHaveBeenCalled();
});

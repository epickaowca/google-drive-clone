export {};
// import { Modal } from "../Modal";
// import { screen, render, act } from "@testing-library/react";

// it("renders modal without error", async () => {
//   const onClose = jest.fn();
//   const onSubmit = jest.fn();

//   const { rerender } = render(
//     <Modal message="message" onClose={onClose} onSubmit={onSubmit} />
//   );
//   const message = screen.getByText("message");
//   const dialog = screen.getByRole("dialog");
//   const btn = screen.getByText("Remove");
//   expect(message).toBeInTheDocument();
//   expect(dialog).toBeInTheDocument();
//   await act(async () => {
//     btn.click();
//   });
//   rerender(<Modal message="message" onClose={onClose} onSubmit={onSubmit} />);

//   expect(onSubmit).toHaveBeenCalled();
//   expect(onClose).toHaveBeenCalled();
// });

// it("renders error modal", async () => {
//   const onClose = jest.fn();
//   const onSubmit = jest.fn();

//   const { rerender } = render(
//     <Modal
//       message="message"
//       error="error"
//       onClose={onClose}
//       onSubmit={onSubmit}
//     />
//   );
//   const dialog = screen.getByRole("dialog");
//   const btn = screen.getByText("OK");
//   expect(dialog).toBeInTheDocument();
//   await act(async () => {
//     btn.click();
//   });
//   rerender(<Modal message="error" onClose={onClose} onSubmit={onSubmit} />);
//   expect(onSubmit).toHaveBeenCalled();
//   expect(onClose).toHaveBeenCalled();
// });

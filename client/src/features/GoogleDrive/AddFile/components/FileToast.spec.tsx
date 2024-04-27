export {};

// import {
//   screen,
//   render,
//   act,
//   fireEvent,
//   queryByAttribute,
// } from "@testing-library/react";
// import { userEvent } from "@testing-library/user-event";
// import {FileToast} from './FileToast'
// import * as services from "../services";

// // mock function
// jest.mock("../services", () => ({
//   ...jest.requireActual("../services"),
//   fileExists: jest.fn(() => true),
// }));

// expect(services.fileExists).toHaveBeenCalled();

// //#########################
// // spy on function
// const fileExistsSpy = jest.spyOn(services, "fileExists");
// fileExistsSpy.mockResolvedValue(true);

// const userId = "user123";

// file={}id=""onClose

// it("displays error file exists toast", ()=>{
// render(<FileToast   />)
// })

// // should display toast success
// // should display toast error file exists
// // should display toast error network
// // should add file to database

// // it("adds file to database", async () => {
// //   const file = new File([new ArrayBuffer(100)], "hello.png", {
// //     type: "image/png",
// //   });
// //   const { rerender, container } = render(
// //     <AddFile currentFolder={ROOT_FOLDER} userId={userId} />
// //   );
// //   const getById = queryByAttribute.bind(null, "id");
// //   const fileInput = getById(container, "file_input");
// //   await act(async () => {
// //     await userEvent.upload(fileInput!, file);
// //   });
// //   rerender(<AddFile currentFolder={ROOT_FOLDER} userId={userId} />);
// //   const toast = screen.getByRole("alert");
// //   expect(toast).toBeInTheDocument();
// //   expect(getSizeMeasurementFile).toHaveBeenCalled();
// //   expect(uploadFile).toHaveBeenCalledWith({
// //     errorCB: expect.anything(),
// //     file,
// //     filePath: "/files/user123/Root/hello.png",
// //     finishCB: expect.anything(),
// //     folderId: ROOT_FOLDER.id,
// //     uploadTaskCB: expect.anything(),
// //     userId,
// //   });
// // });

// // it("shows disk space exceeded error", async () => {
// //   const file = new File([new ArrayBuffer(16500000)], "hello.png", {
// //     type: "image/png",
// //   });
// //   const { rerender, container } = render(
// //     <AddFile currentFolder={ROOT_FOLDER} userId={userId} />
// //   );
// //   const getById = queryByAttribute.bind(null, "id");
// //   const fileInput = getById(container, "file_input");

// //   await userEvent.upload(fileInput!, file);

// //   rerender(<AddFile currentFolder={ROOT_FOLDER} userId={userId} />);
// //   expect(getSizeMeasurementFile).toHaveBeenCalled();
// //   const toast = screen.getByRole("alert");
// //   const errorToast = screen.getByText("disk space exceeded");
// //   expect(toast).toBeInTheDocument();
// //   expect(errorToast).toBeInTheDocument();
// // });

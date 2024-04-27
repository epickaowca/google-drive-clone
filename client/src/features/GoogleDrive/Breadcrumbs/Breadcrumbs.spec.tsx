export {};
// import { screen, render } from "@testing-library/react";
// import { Breadcrumbs } from "../Breadcrumbs";
// import { FirebaseFolder } from "../../../types";
// import { MemoryRouter } from "react-router-dom";

// const fakeFolder: FirebaseFolder = {
//   name: "fakeFolder",
//   id: "fakeFolderId",
//   path: [
//     {
//       id: null,
//       name: "Root",
//     },
//   ],
//   createdAt: null,
//   parentId: null,
//   userId: "user123",
// };

// it("displays folder path", () => {
//   render(
//     <MemoryRouter>
//       <Breadcrumbs currentFolder={fakeFolder} />
//     </MemoryRouter>
//   );
//   const rootAnchor = screen.getByText("Root");
//   const folderLi = screen.getByText(fakeFolder.name);
//   expect(rootAnchor).toBeInTheDocument();
//   expect(rootAnchor).toHaveAttribute("href", "/");
//   expect(folderLi).toBeInTheDocument();
//   expect(folderLi.tagName).toBe("LI");
// });

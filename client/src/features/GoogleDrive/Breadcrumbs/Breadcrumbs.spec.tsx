import { screen } from "@testing-library/react";
import { render } from "../../../../tests/render";
import { Breadcrumbs } from "../Breadcrumbs";
import { fakeFolder } from "../../../../tests/constants";
import { useDrive } from "../../../context";

const mockedUseDrive = useDrive as jest.Mock<any>;

it("displays root li", () => {
  mockedUseDrive.mockReturnValue({ currentFolder: fakeFolder });
  render(<Breadcrumbs />);
  const rootFolderLi = screen.getByText("Root");
  expect(rootFolderLi.closest("li")).toBeInTheDocument();
  expect(rootFolderLi.closest("a")).toBeInTheDocument();
});

it("displays root anchor and fakeFolder li", () => {
  mockedUseDrive.mockReturnValue({ currentFolder: fakeFolder });
  render(<Breadcrumbs />);
  const fakeFolderLi = screen.getByText(fakeFolder.name);
  expect(fakeFolderLi.closest("li")).toBeInTheDocument();
  expect(fakeFolderLi.closest("a")).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Root" })).toBeInTheDocument();
});

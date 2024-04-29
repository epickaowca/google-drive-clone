import { screen } from "@testing-library/react";
import { render } from "../../../../tests/render";
import { Breadcrumbs } from "../Breadcrumbs";
import { fakeFolder } from "../../../../tests/mocks/contextProvider";

it("displays root anchor and fakeFolder li", () => {
  render(<Breadcrumbs />);
  const fakeFolderLi = screen.getByText(fakeFolder.name);
  expect(fakeFolderLi.closest("li")).toBeInTheDocument();
  expect(fakeFolderLi.closest("a")).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Root" })).toBeInTheDocument();
});

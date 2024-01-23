import { screen, render, act } from "@testing-library/react";
import { Folder } from "../Folder";
import { MemoryRouter } from "react-router-dom";
import {
  removeFolder,
  fakeFolder,
  getChildFolders,
} from "../../../../../tests/mocks/fileMock";

jest.mock("../../../../../tests/mocks/fileMock", () => {
  const originalModule = jest.requireActual(
    "../../../../../tests/mocks/fileMock"
  );
  return {
    __esModule: true,
    ...originalModule,
  };
});

const userId = "user123";

const myFakeFolder = {
  createdAt: null,
  name: "fakeFolder",
  id: "fakeFolderId",
  parentId: "gfreg",
  path: [],
  userId,
};

const myFakeFolderWithChildren = {
  createdAt: null,
  name: "fakeFolder",
  id: fakeFolder.parentId,
  parentId: "gfreg",
  path: [],
  userId,
};

afterEach(() => {
  removeFolder.mockClear();
});

it("renders folder with correct url", async () => {
  render(
    <MemoryRouter>
      <Folder userId={userId} folder={myFakeFolder} />
    </MemoryRouter>
  );
  const anchor = screen.getByRole("link");
  await expect(anchor).toHaveAttribute("href", `/folder/${myFakeFolder.id}`);
});

it("removes Folder", async () => {
  const component = (
    <MemoryRouter>
      <Folder userId={userId} folder={myFakeFolder} />
    </MemoryRouter>
  );
  const { rerender } = render(component);
  const button = screen.getByRole("button");
  await act(async () => {
    await button.click();
  });
  rerender(component);
  const dialog = screen.getByRole("dialog");
  const info = screen.getByText(
    `Are you sure you want to delete ${myFakeFolder.name}?`
  );
  const removeBtn = screen.getByText("Remove");
  expect(dialog).toBeInTheDocument();
  expect(info).toBeInTheDocument();
  await act(async () => {
    await removeBtn.click();
  });
  rerender(component);
  expect(removeFolder).toHaveBeenCalled();
  expect(dialog).not.toBeInTheDocument();
});

it("doesn't allow to remove non empty Folder", async () => {
  getChildFolders.mockImplementation(
    jest.fn(async ({ parentId, userId, callbackFunc }) => {
      const cos = [
        {
          id: fakeFolder.id,
          data: () => {
            const { id, ...rest } = fakeFolder;
            return rest;
          },
        },
      ];
      callbackFunc(cos);
    })
  );

  const component = (
    <MemoryRouter>
      <Folder userId={userId} folder={myFakeFolderWithChildren} />
    </MemoryRouter>
  );
  const { rerender } = render(component);
  const button = screen.getByRole("button");
  await act(async () => {
    await button.click();
  });
  rerender(component);
  const dialog = screen.getByRole("dialog");
  const info = screen.getByText("folder must be empty");
  const okBtn = screen.getByText("OK");
  expect(dialog).toBeInTheDocument();
  expect(info).toBeInTheDocument();
  await act(async () => {
    await okBtn.click();
  });
  rerender(component);
  expect(removeFolder).not.toHaveBeenCalled();
  expect(dialog).not.toBeInTheDocument();
});

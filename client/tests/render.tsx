import { render as reactRender } from "@testing-library/react";
import { ReactNode } from "react";
import { MockRouter } from "./mocks/routerProvider";
import { MockContext } from "./mocks/contextProvider";

export const render = (children: ReactNode) => {
  return reactRender(<>{children}</>, {
    wrapper: () => (
      <MockRouter>
        <MockContext>{children}</MockContext>
      </MockRouter>
    ),
  });
};

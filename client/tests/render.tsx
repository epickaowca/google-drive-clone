import { render as reactRender } from "@testing-library/react";
import { ReactNode } from "react";
import { MockRouter } from "./mocks/routerProvider";

export const render = (children: ReactNode) => {
  return reactRender(<>{children}</>, {
    wrapper: () => <MockRouter>{children}</MockRouter>,
  });
};

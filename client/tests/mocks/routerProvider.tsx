import { FC, ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";

export const MockRouter: FC<{ children?: ReactNode }> = ({ children }) => {
  return <MemoryRouter>{children}</MemoryRouter>;
};

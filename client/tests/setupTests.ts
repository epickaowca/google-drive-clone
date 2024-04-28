import "@testing-library/jest-dom";
import { userId } from "./constants";

jest.mock("react-firebase-hooks/auth", () => ({
  ...jest.requireActual("react-firebase-hooks/auth"),
  useAuthState: jest.fn(() => [{ uid: userId }, false, false]),
}));

jest.mock("../src/firebase", () => ({
  db: jest.fn(),
  auth: jest.fn(),
  storage: jest.fn(),
}));

jest.mock("../src/context/services", () => ({
  subscribe: jest.fn(() => () => {}),
}));

jest.mock("../src/services", () => ({
  getSizeMeasurementFile: jest.fn(() => ({ diskSpaceUsed: 0 })),
  updateSizeMeasurementFile: jest.fn(),
  createSizeMeasurementFile: jest.fn(),
}));

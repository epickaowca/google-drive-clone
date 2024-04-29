import { bytesToMb } from "./index";

it("bytesToMb function should convert 20971520 bytes to 20.00Mb", () => {
  expect(bytesToMb(20971520)).toBe("20.00");
});

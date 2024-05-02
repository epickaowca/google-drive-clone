import { screen, waitFor } from "@testing-library/react";
import { render } from "@tests/render";
import { AvailableDiskSpace } from "../AvailableDiskSpace";
import { getSizeMeasurementFile } from "@root/services";

const mockedSizeMeasurementFile = getSizeMeasurementFile as jest.Mock<any>;

it("displays default available disk space", () => {
  render(<AvailableDiskSpace />);
  expect(mockedSizeMeasurementFile).toHaveBeenCalled();
  expect(screen.getByText("0.00 / 20Mb")).toBeInTheDocument();
});

it("displays available disk space for 15728640 bytes used", async () => {
  mockedSizeMeasurementFile.mockResolvedValue({ diskSpaceUsed: 15728640 });
  render(<AvailableDiskSpace />);
  expect(mockedSizeMeasurementFile).toHaveBeenCalled();
  await waitFor(async () =>
    expect(screen.getByText("15.00 / 20Mb")).toBeInTheDocument()
  );
});

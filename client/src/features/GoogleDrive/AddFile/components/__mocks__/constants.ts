export const downloadUrl = "mockedUrl";

const ref = jest.fn(() => ({}));
const getDownloadURL = jest.fn(() => Promise.resolve(downloadUrl));
const uploadBytesResumable = jest.fn(() => ({
  snapshot: { ref: {} },
  on: () => {},
}));

export { ref, uploadBytesResumable, getDownloadURL };

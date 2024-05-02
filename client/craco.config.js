const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@root": path.resolve(__dirname, "src"),
      "@tests": path.resolve(__dirname, "tests"),
    },
  },
};

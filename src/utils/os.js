const os = require("os");

const isWindows = () => os.type().toLowerCase().includes("windows");

module.exports = {
  isWindows,
};

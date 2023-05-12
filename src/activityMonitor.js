const execProcess = require("./utils/execProcess");
const { addValueToBufferWithTimestamp } = require("./utils/buffer");
const { writeBufferToLogFile } = require("./utils/log");
const { isWindows } = require("./utils/os");
const { WINDOWS_TOP_COMMAND, UNIX_TOP_COMMAND } = require("./constants");

const cleanUp = () => {
  clearInterval(interval);
  clearInterval(interval2);
};

const command = isWindows() ? WINDOWS_TOP_COMMAND : UNIX_TOP_COMMAND;

const checkActivity = () => {
  try {
    execProcess(command)
      .then((value) => addValueToBufferWithTimestamp(value))
      .catch((err) => cleanUp());
  } catch (err) {
    cleanUp();
  }
};

const interval = setInterval(() => checkActivity(), 100);
const interval2 = setInterval(
  () => writeBufferToLogFile().catch((err) => cleanUp()),
  60000
);

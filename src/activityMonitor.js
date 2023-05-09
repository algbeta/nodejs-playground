const execProcess = require("./utils/execProcess");
const { addValueToBufferWithTimestamp } = require("./utils/buffer");
const { writeBufferToLogFile } = require("./utils/log");

const cleanUp = () => {
  clearInterval(interval);
  clearInterval(interval2);
};

const checkActivity = () => {
  try {
    execProcess("ps -A -o %cpu,%mem,comm | sort -nr | head -n 1")
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

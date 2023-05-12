const addValueToBuffer = (value) => {
  const newValue = Buffer.from(value);
  buffer = Buffer.concat([buffer, newValue]);
};

const addValueToBufferWithTimestamp = (value) =>
  addValueToBuffer(`${Date.now()}: ${value}`);

const clearBuffer = () => {
  buffer = Buffer.from("");
};

const getBuffer = () => buffer.toString();

let buffer = Buffer.from("");

module.exports = {
  addValueToBuffer,
  getBuffer,
  clearBuffer,
  addValueToBufferWithTimestamp,
};

const path = require('path');
const fs = require('fs');
const { getBuffer, clearBuffer } = require('./buffer');

const logDirLocation = path.resolve(__dirname, '..', '..', 'logs');
const logFileLocation = path.resolve(__dirname, '..', '..', 'logs', 'activityMonitor.log');

const createDirIfNotExists = dir =>
  !fs.existsSync(dir) ? fs.mkdirSync(dir) : undefined;


const writeBufferToLogFile = () => {
  createDirIfNotExists(logDirLocation);
  return new Promise((resolve, reject) => {
    fs.appendFile(logFileLocation, getBuffer(), (err) => {
      if (err) {
        reject(err);
      }
        
      clearBuffer();
      resolve("file updated successfully!");
    });
  });
}

module.exports = {
  writeBufferToLogFile
}
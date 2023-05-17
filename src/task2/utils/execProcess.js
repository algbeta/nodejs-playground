const childProcess = require("child_process");

const execProcess = (command) => {
  return new Promise((resolve, reject) => {
    childProcess.exec(command, (error, stdout, stderr) => {
      if (stderr) {
        reject(stderr);
      }

      if (error !== null) {
        console.log(`error: ${error}`);
        reject(stderr);
      }

      console.clear();
      console.log(stdout);
      resolve(stdout);
    });
  });
};

module.exports = execProcess;

const childProcess = require('child_process');

const execProcess = (command, callback) => {
  childProcess.exec(command, (error, stdout, stderr) => {
    console.clear();
    console.log(stdout);
    if(callback) {
      callback(stdout);
    }

    if(stderr) {
      console.log(`stderr: ${stderr}`);
    }

    if (error !== null) {
      console.log(`error: ${error}`);
    }
  });
}

module.exports = execProcess;
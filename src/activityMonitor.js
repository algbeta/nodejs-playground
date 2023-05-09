
const execProcess = require('./utils/execProcess');
const { addValueToBufferWithTimestamp } = require('./utils/buffer');
const { writeBufferToLogFile } = require('./utils/log');


const checkActivity = () =>  execProcess('ps -A -o %cpu,%mem,comm | sort -nr | head -n 1', addValueToBufferWithTimestamp);

const interval = setInterval(checkActivity, 100)
const interval2 = setInterval(writeBufferToLogFile, 60000)
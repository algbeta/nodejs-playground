const repl = require('repl');

function getRandomNumber(){
  return Math.floor(Math.random()*100);
};

function main() {
  const replServer = repl.start();
  replServer.defineCommand("getRandomNumber", {
     action() {
       this.clearBufferedCommand();
       console.log(`Your random number is: ` + getRandomNumber());
       this.displayPrompt();
     },
 });
}

main();
const EventEmitter = require("./EventEmitter");

class WithTime extends EventEmitter {
  constructor(fn) {
    super();
  }

  async execute(asyncFunc, ...args) {
    this.emit("begin");
    let t = process.hrtime();
    const executionResult = await (await asyncFunc(...args)).json();

    this.emit("data", executionResult);
    t = process.hrtime(t);
    this.emit("end");
    console.log("benchmark took %d seconds and %d nanoseconds", t[0], t[1]);
  }
}

const withTime = new WithTime();

withTime.on("begin", () => console.log("About to execute"));
withTime.on("end", () => console.log("Done with execute"));
withTime.on("data", (data) => console.log(data));
console.log(withTime.rawListeners("end"));

withTime.execute(() => fetch("https://jsonplaceholder.typicode.com/posts/1"));

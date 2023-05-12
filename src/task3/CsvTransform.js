const { pipeline } = require("stream/promises");
const fs = require("fs");
const path = require("path");
const csv = require("csvtojson");

const readStream = fs.createReadStream(
  path.resolve(__dirname, "..", "..", "csvdirectory", "file.csv"),
  { encoding: "utf-8" }
);

const writeStream = fs.createWriteStream(
  path.resolve(__dirname, "..", "..", "csvdirectory", "fileOutput.txt"),
  { encoding: "utf-8" }
);

(async function run() {
  try {
    await pipeline(readStream, csv(), writeStream);
    console.log("pipeline finished successfully");
  } catch (err) {
    console.error("pipeline finished with error:", err);
  }
})();

const fs = require("fs");
const path = require("path");

const { replaceBackground } = require('backrem');

const catExample = fs.createReadStream(
  path.resolve(__dirname, "./target/cat.jpg")
);

const spaceExample = fs.createReadStream(
  path.resolve(__dirname, "./target/space.jpg")
);

replaceBackground(catExample, spaceExample, [200, 50, 50], 3).then(
  (readableStream) => {
    const writableStream = fs.createWriteStream(
      path.resolve(__dirname, "./result/result.jpg")
    );

    readableStream.pipe(writableStream);
  }
);

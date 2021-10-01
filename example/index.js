const fs = require("fs");
const path = require("path");
const http = require("http");

const { replaceBackground } = require("backrem");

http
  .createServer((req, res) => {
    const catExample = fs.createReadStream(
      path.resolve(__dirname, "./target/cat.jpg")
    );

    const spaceExample = fs.createReadStream(
      path.resolve(__dirname, "./target/space.jpg")
    );

    replaceBackground(catExample, spaceExample, [200, 50, 52], 0).then(
      (readableStream) => {
        // const writableStream = fs.createWriteStream(
        //   path.resolve(__dirname, "./result/result.jpg")
        // );

        readableStream.pipe(res);
      }
    );
  })
  .listen(3005);

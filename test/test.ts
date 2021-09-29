import fs from "fs";
import path from "path";

import { replaceBackground } from "../src";

const catExample = fs.createReadStream(
  path.resolve(__dirname, "../examples/cat.jpg")
);

const spaceExample = fs.createReadStream(
  path.resolve(__dirname, "../examples/space.jpg")
);

replaceBackground(catExample, spaceExample, [200, 50, 50], 3)
  .then((readableStream) => {
    const writableStream = fs.createWriteStream(path.resolve(__dirname, "../dist/result.jpg"));

    readableStream.pipe(writableStream);
  });

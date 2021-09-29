import fs from "fs";
import path from "path";
import { performance } from 'perf_hooks';

import { replaceBackground } from "../src";

const catExample = fs.createReadStream(
  path.resolve(__dirname, "../examples/cat1.jpg")
);

const spaceExample = fs.createReadStream(
  path.resolve(__dirname, "../examples/space.jpg")
);

const t1 = performance.now();

console.log(performance.now());


replaceBackground(catExample, spaceExample, [200, 50, 50], 3)
  .then((readableStream) => {
    const writableStream = fs.createWriteStream(path.resolve(__dirname, "../dist/result.jpg"));

    readableStream.pipe(writableStream);

    readableStream.on('end', () => {
      console.log((performance.now() - t1) / 1000);
    });
  });

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

replaceBackground(catExample, spaceExample, [200, 50, 50], 3).then((buffer) => {
  fs.writeFileSync(path.resolve(__dirname, "../dist/result.jpg"), buffer, "binary");

  console.log((performance.now() - t1) / 1000);
});

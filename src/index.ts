import { performance } from "perf_hooks";

import { deltaE } from "./utils/deltaE";
import { getRawFromBuffer } from "./utils/getRawFromBuffer";
import { areSameSize } from "./utils/areSameSize";
import { streamToBuffer } from "./utils/streamToBuffer";
import { createOutputBuffer } from "./utils/createOutputBuffer";

export const replaceBackground = async (
  targetImageStream: NodeJS.ReadableStream,
  backgroundImageStream: NodeJS.ReadableStream,
  colorToReplace: [number, number, number] = [255, 255, 255],
  threshold = 3
) => {
  const [backgroundImageRaw, targetImageRaw] = await Promise.all([
    streamToBuffer(backgroundImageStream).then(getRawFromBuffer),
    streamToBuffer(targetImageStream).then(getRawFromBuffer),
  ]);

  if (areSameSize(backgroundImageRaw.info, targetImageRaw.info) === false) {
    throw new Error(
      "Target image size should be equal to background image size..."
    );
  }

  console.log("b", performance.now());

  const newPixels: number[] = [];

  for (let i = 0; i < targetImageRaw.info.height; i++) {
    for (let j = 0; j < targetImageRaw.info.width; j++) {
      const startIndex = i * targetImageRaw.info.width * 4 + j * 4;

      const pixel = [
        targetImageRaw.data[startIndex],
        targetImageRaw.data[startIndex + 1],
        targetImageRaw.data[startIndex + 2],
      ];

      if (deltaE([pixel[0], pixel[1], pixel[2]], colorToReplace) < threshold) {
        newPixels.push(
          backgroundImageRaw.data[startIndex],
          backgroundImageRaw.data[startIndex + 1],
          backgroundImageRaw.data[startIndex + 2],
        );
      } else {
        newPixels.push(pixel[0], pixel[1], pixel[2]);
      }
    }
  }

  console.log("c", performance.now());

  return await createOutputBuffer(
    Uint8Array.from(newPixels),
    targetImageRaw.info.width,
    targetImageRaw.info.height
  );
};

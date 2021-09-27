import sharp from "sharp";

export const createOutputBuffer = async (
  newPixels: Uint8Array,
  width: number,
  height: number
) => {
  return await sharp(newPixels, {
    raw: {
      width,
      height,
      channels: 3,
    },
  })
    .jpeg()
    .toBuffer();
};

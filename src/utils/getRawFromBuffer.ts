import sharp from "sharp";

export async function getRawFromBuffer(image: Buffer) {
  return await sharp(image)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
}

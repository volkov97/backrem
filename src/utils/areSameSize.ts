import sharp from "sharp";

export const areSameSize = (img1: sharp.OutputInfo, img2: sharp.OutputInfo) => {
  return img1.width === img2.width && img1.height === img2.height && img1.channels === img2.channels;
};

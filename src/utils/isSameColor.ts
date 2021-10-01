import { RGBPixel } from "../types";

export function isSameColor(pixel1: RGBPixel, pixel2: RGBPixel) {
    return pixel1[0] === pixel2[0] && pixel1[1] === pixel2[1] && pixel1[2] === pixel2[2];
}
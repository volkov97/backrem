/// <reference types="node" />
import sharp from "sharp";
export declare function getRawFromBuffer(image: Buffer): Promise<{
    data: Buffer;
    info: sharp.OutputInfo;
}>;

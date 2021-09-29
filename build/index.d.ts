/// <reference types="node" />
import { ReadableStreamBuffer } from "stream-buffers";
export declare const replaceBackground: (targetImageStream: NodeJS.ReadableStream, backgroundImageStream: NodeJS.ReadableStream, colorToReplace?: [number, number, number], threshold?: number) => Promise<ReadableStreamBuffer>;

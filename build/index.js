"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceBackground = void 0;
// import { performance } from "perf_hooks";
var stream_buffers_1 = require("stream-buffers");
var deltaE_1 = require("./utils/deltaE");
var getRawFromBuffer_1 = require("./utils/getRawFromBuffer");
var areSameSize_1 = require("./utils/areSameSize");
var streamToBuffer_1 = require("./utils/streamToBuffer");
var createOutputBuffer_1 = require("./utils/createOutputBuffer");
var replaceBackground = function (targetImageStream, backgroundImageStream, colorToReplace, threshold) {
    if (colorToReplace === void 0) { colorToReplace = [255, 255, 255]; }
    if (threshold === void 0) { threshold = 3; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, backgroundImageRaw, targetImageRaw, newPixels, i, j, startIndex, pixel, resultBuffer, readable;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        (0, streamToBuffer_1.streamToBuffer)(backgroundImageStream).then(getRawFromBuffer_1.getRawFromBuffer),
                        (0, streamToBuffer_1.streamToBuffer)(targetImageStream).then(getRawFromBuffer_1.getRawFromBuffer),
                    ])];
                case 1:
                    _a = _b.sent(), backgroundImageRaw = _a[0], targetImageRaw = _a[1];
                    if ((0, areSameSize_1.areSameSize)(backgroundImageRaw.info, targetImageRaw.info) === false) {
                        throw new Error("Target image size should be equal to background image size...");
                    }
                    newPixels = [];
                    for (i = 0; i < targetImageRaw.info.height; i++) {
                        for (j = 0; j < targetImageRaw.info.width; j++) {
                            startIndex = i * targetImageRaw.info.width * 4 + j * 4;
                            pixel = [
                                targetImageRaw.data[startIndex],
                                targetImageRaw.data[startIndex + 1],
                                targetImageRaw.data[startIndex + 2],
                            ];
                            if ((0, deltaE_1.deltaE)([pixel[0], pixel[1], pixel[2]], colorToReplace) < threshold) {
                                newPixels.push(backgroundImageRaw.data[startIndex], backgroundImageRaw.data[startIndex + 1], backgroundImageRaw.data[startIndex + 2]);
                            }
                            else {
                                newPixels.push(pixel[0], pixel[1], pixel[2]);
                            }
                        }
                    }
                    return [4 /*yield*/, (0, createOutputBuffer_1.createOutputBuffer)(Uint8Array.from(newPixels), targetImageRaw.info.width, targetImageRaw.info.height)];
                case 2:
                    resultBuffer = _b.sent();
                    readable = new stream_buffers_1.ReadableStreamBuffer({
                        frequency: 10,
                        chunkSize: 2048,
                    });
                    readable.put(resultBuffer);
                    return [2 /*return*/, readable];
            }
        });
    });
};
exports.replaceBackground = replaceBackground;

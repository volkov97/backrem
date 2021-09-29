"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamToBuffer = void 0;
function streamToBuffer(stream) {
    return new Promise(function (resolve) {
        var buffer = Buffer.from([]);
        stream.on('data', function (data) {
            buffer = Buffer.concat([buffer, data]);
        });
        stream.on('end', function () {
            resolve(buffer);
        });
    });
}
exports.streamToBuffer = streamToBuffer;

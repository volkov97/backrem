"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areSameSize = void 0;
var areSameSize = function (img1, img2) {
    return img1.width === img2.width && img1.height === img2.height && img1.channels === img2.channels;
};
exports.areSameSize = areSameSize;

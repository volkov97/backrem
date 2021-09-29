# Backrem

Tool to replace "plain-color" background on images.

This tool provides a function called `replaceBackground`. This function has 2 required arguments and 2 optional:

1) Image to replace background (readable stream)
2) Background image (readable stream, should have the same size as image in first argument)
3) Color to detect background (array of 3 numbers RGB)
4) Threshold - number from 0 to 100, where 0 means to replace only color from third argument, higher means similarity of colors

Read more about colors similarity here:
https://stackoverflow.com/questions/13586999/color-difference-similarity-between-two-values-with-js

This function returns readable stream with result image.

You can also see working example in `example` directory.
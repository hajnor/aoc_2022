"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
printResult(getInput());
function getInput() {
    var file = (0, fs_1.readFileSync)('./input.txt', 'utf-8');
    return file.split(/\n/);
}
function printResult(input) {
    console.log();
}

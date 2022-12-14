"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var Solution = /** @class */ (function () {
    function Solution() {
        this.currentRoute = [];
        this.alternativeRoutes = {};
        this.grid = [];
        this.visited = 0;
        this.printResult(this.getInput());
    }
    Solution.prototype.getInput = function () {
        var file = (0, fs_1.readFileSync)('./input.txt', 'utf-8');
        return file.split(/\r?\n/);
    };
    Solution.prototype.printResult = function (input) {
        var _this = this;
        input.forEach(function (line, y) {
            _this.grid[y] = [];
            for (var x = 0; x < line.length; x++) {
                if (line[x] === 'S') {
                    _this.grid[y][x] = 'a'.charCodeAt(0);
                    _this.startPosition = { y: y, x: x };
                }
                else if (line[x] === 'E') {
                    _this.grid[y][x] = 'z'.charCodeAt(0);
                    _this.endPosition = { y: y, x: x };
                }
                else {
                    _this.grid[y][x] = line[x].charCodeAt(0);
                }
                ;
            }
        });
        this.getResult();
        this.printGrid();
        console.log(this.visited);
    };
    Solution.prototype.getResult = function () {
        var currentPosition = __assign({}, this.startPosition);
        this.addPositionToCurrentRoute(currentPosition);
        while (currentPosition.x !== this.endPosition.x || currentPosition.y !== this.endPosition.y) {
            var _a = this.getNextAndAlternativePosition(currentPosition), nextPosition = _a.nextPosition, alternatives = _a.alternatives;
            if (nextPosition) {
                var positionId = this.getPositionId(currentPosition);
                this.addPositionToCurrentRoute(nextPosition);
                this.setAlternativePaths(positionId, alternatives);
                this.visited++;
                currentPosition = nextPosition;
                console.log(this.currentRoute);
            }
            else {
                var lastPositionId = this.rollBackToAlternativeRoute.bind(this)(this.currentRoute[this.currentRoute.length - 1]);
                console.log(lastPositionId, !lastPositionId);
                if (!lastPositionId) {
                    break;
                }
                currentPosition = this.alternativeRoutes[lastPositionId].shift();
                this.addPositionToCurrentRoute(currentPosition);
                this.visited++;
            }
        }
    };
    Solution.prototype.rollBackToAlternativeRoute = function (lastPositionId) {
        var _a;
        if (!this.currentRoute.length) {
            return null;
        }
        else if ((_a = this.alternativeRoutes[lastPositionId]) === null || _a === void 0 ? void 0 : _a.length) {
            console.log("found ", lastPositionId);
            return lastPositionId;
        }
        this.visited--;
        this.currentRoute.pop();
        this.rollBackToAlternativeRoute(this.currentRoute[this.currentRoute.length - 1]);
    };
    Solution.prototype.addPositionToCurrentRoute = function (currentPosition) {
        this.currentRoute.push(this.getPositionId(currentPosition));
    };
    Solution.prototype.getPositionId = function (position) {
        return "".concat(position.y, ":").concat(position.x);
    };
    Solution.prototype.getNextAndAlternativePosition = function (_a) {
        var y = _a.y, x = _a.x;
        var nextPosition = null;
        var alternatives = [];
        if (y < this.grid.length - 1 && this.grid[y + 1][y] - this.grid[y][x] <= 1) {
            var position = { y: y + 1, x: x };
            if (!nextPosition && !this.isPositionIncludedInRoute(position)) {
                nextPosition = position;
            }
            else {
                alternatives.push(position);
            }
        }
        if (x > 0 && this.grid[y][x - 1] - this.grid[y][x] <= 1) {
            var position = { y: y, x: x - 1 };
            if (!nextPosition && !this.isPositionIncludedInRoute(position)) {
                nextPosition = position;
            }
            else {
                alternatives.push(position);
            }
        }
        if (x < this.grid[y].length - 1 && this.grid[y][x + 1] - this.grid[y][x] <= 1) {
            var position = { y: y, x: x + 1 };
            if (!nextPosition && !this.isPositionIncludedInRoute(position)) {
                nextPosition = position;
            }
            else {
                alternatives.push(position);
            }
        }
        if (y > 0 && this.grid[y - 1][x] - this.grid[y][x] <= 1) {
            var position = { y: y - 1, x: x };
            if (!nextPosition && !this.isPositionIncludedInRoute(position)) {
                nextPosition = position;
            }
            else {
                alternatives.push(position);
            }
        }
        return { nextPosition: nextPosition, alternatives: alternatives };
    };
    Solution.prototype.setAlternativePaths = function (positionId, alternatives) {
        this.alternativeRoutes[positionId] = alternatives;
    };
    Solution.prototype.isPositionIncludedInRoute = function (position) {
        return this.currentRoute.includes(this.getPositionId(position));
    };
    Solution.prototype.printGrid = function () {
        for (var y = 0; y < this.grid.length; y++) {
            for (var x = 0; x < this.grid[y].length; x++) {
                var numberChar = "".concat(this.grid[y][x]);
                if (numberChar.length === 1) {
                    process.stdout.write('   ');
                }
                if (numberChar.length === 2) {
                    process.stdout.write('');
                }
                process.stdout.write(" ".concat(this.grid[y][x], " "));
            }
            process.stdout.write('\n');
        }
    };
    return Solution;
}());
new Solution();

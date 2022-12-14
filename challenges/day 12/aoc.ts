import { readFileSync } from 'fs';

printResult(getInput());

function getInput(): string[] {
    const file = readFileSync('./input.txt', 'utf-8');
    return file.split(/\r?\n/);
}

function printResult(input: string[]): void {
    let startPos: { y: number, x: number };
    let endPos: { y: number, x: number };
    const grid: number[][] = [];

    input.forEach((line, y) => {
        grid[y] = [];
        for (let x = 0; x < line.length; x++) {
            if (line[x] === 'S') {
                grid[y][x] = 'a'.charCodeAt(0);
                startPos = { y, x };
            } else if (line[x] === 'E') {
                grid[y][x] = 'z'.charCodeAt(0);
                endPos = { y, x };
            } else {
                grid[y][x] = line[x].charCodeAt(0)
            };
        }
    });

    function isAccessible(grid: number[][], y: number, x: number): boolean {
        if ((x === 0 || grid[y][x] - grid[y][x - 1] > 1)
            && (x === grid[y].length - 1 || grid[y][x] - grid[y][x + 1] > 1)
            && (y === 0 || grid[y][x] - grid[y - 1][x] > 1)
            && (y === grid.length - 1 || grid[y][x] - grid[y + 1][y] > 1)) {
            return false;
        }
        return true;
    }

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (!isAccessible(grid, y, x)) {
                grid[y][x] = null;
            }
        }
    }

    const distanceMap: number[][] = [];

    let distanceY = 0;
    let distanceX = 0;
    for (let y = endPos.y; y < grid.length; y++) {
        distanceX = 0;
        distanceMap[y] = [];
        for (let x = endPos.x; x < grid[y].length; x++) {
            if (x === endPos.x && y == endPos.y) {
                distanceMap[y][x] = 0;
            } else {
                console.log(y, x, distanceX, distanceY, distanceX + distanceY);
                distanceMap[y][x] = grid[y][x] === null ? null : distanceX + distanceY;
            }
            distanceX++;
        }

        distanceX = 0;
        for (let x = endPos.x; x >= 0; x--) {
            if (x === endPos.x && y == endPos.y) {
                distanceMap[y][x] = 0;
            } else {
                console.log(y, x, distanceX, distanceY, distanceX + distanceY);
                distanceMap[y][x] = grid[y][x] === null ? null : distanceX + distanceY;
            }
            distanceX++;
        }
        distanceY++;
    };

    distanceY = 0;
    for (let y = endPos.y; y >= 0; y--) {
        distanceX = 0;
        if (!distanceMap[y]) {
            distanceMap[y] = [];
        }
        for (let x = endPos.x; x < grid[y].length; x++) {
            if (x === endPos.x && y == endPos.y) {
                distanceMap[y][x] = 0;
            } else {
                console.log(y, x, distanceX, distanceY, distanceX + distanceY);
                distanceMap[y][x] = grid[y][x] === null ? -1 : distanceX + distanceY;
            }
            distanceX++;
        }

        distanceX = 0;
        for (let x = endPos.x; x >= 0; x--) {
            if (x === endPos.x && y == endPos.y) {
                distanceMap[y][x] = 0;
            } else {
                console.log(y, x, distanceX, distanceY, distanceX + distanceY);
                distanceMap[y][x] = grid[y][x] === null ? -1 : distanceX + distanceY;
            }
            distanceX++;
        }
        distanceY++;
    };


    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            const numberChar = `${grid[y][x]}`;
            if (numberChar.length === 1) {
                process.stdout.write('   ');
            }
            if (numberChar.length === 2) {
                process.stdout.write('');
            }
            process.stdout.write(` ${grid[y][x]} `);
        }
        process.stdout.write('\n');
    }


    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            const numberChar = `${grid[y][x]}`;
            if (numberChar.length === 1) {
                process.stdout.write('   ');
            }
            if (numberChar.length === 2) {
                process.stdout.write('');
            }
            process.stdout.write(` ${distanceMap[y][x]} `);
        }
        process.stdout.write('\n');
    }
}
import { readFileSync } from 'fs';

printResult(getInput());

function getInput(): string[] {
    const file = readFileSync('./input.txt', 'utf-8');
    return file.split(/\r?\n/);
}

function printResult(input: string[]): void {
    const trees = input.map(line => Array.from(line).map(Number));
    console.log(getHighestTreeScore(trees));
}

function getHighestTreeScore(trees: number[][]): number {
    let max = 0;

    trees.forEach((treeLine, y) => {
        treeLine.forEach((tree, x) => {
            let score = getTreeScore(trees, tree, y, x);
            if (score > max) { max = score };
        })
    });

    return max;
}

function getTreeScore(trees: number[][], currentTree: number, yCoord: number, xCoord: number): number {
    if (yCoord === 0 || xCoord === 0 || yCoord === trees.length - 1 || xCoord === trees[0].length - 1) {
        return 0;
    }

    let right = 0;
    let left = 0;
    let down = 0;
    let up = 0;

    for (let x = xCoord + 1; x <= trees[0].length - 1; x++) {
        right++;
        if (trees[yCoord][x] >= currentTree) {
            break;
        }
    }

    for (let x = xCoord - 1; x >= 0; x--) {
        left++;
        if (trees[yCoord][x] >= currentTree) {
            break;
        }
    }

    for (let y = yCoord + 1; y <= trees.length - 1; y++) {
        down++;
        if (trees[y][xCoord] >= currentTree) {
            break;
        }
    }

    for (let y = yCoord - 1; y >= 0; y--) {
        up++;
        if (trees[y][xCoord] >= currentTree) {
            break;
        }
    }

    return left * right * up * down;
}

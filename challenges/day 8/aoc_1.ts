import { readFileSync } from 'fs';

printResult(getInput());

function getInput(): string[] {
    const file = readFileSync('./input.txt', 'utf-8');
    return file.split(/\r?\n/);
}

function printResult(input: string[]): void {
    const trees = input.map(line => Array.from(line).map(Number));
    console.log(getVisibleTrees(trees));
}

function getVisibleTrees(trees: number[][]): number {
    let localMaxes: Record<string, string> = {};    
    let totalVisibleTrees = 0;

    for (let y = 0; y <= trees.length - 1; y++) {
        let max = -1;
        for (let x = 0; x <= trees[0].length - 1; x++) {
            const currentTree = trees[y][x];
            const id = `${y}:${x}`;
            if (currentTree > max) {
                if (!localMaxes[id]) {
                    localMaxes[id] = id;
                    totalVisibleTrees++;
                }
                max = currentTree;
            }
        }
    }

    for (let y = 0; y <= trees.length - 1; y++) {
        let max = -1;
        for (let x = trees[0].length - 1; x >= 0; x--) {
            const currentTree = trees[y][x];
            const id = `${y}:${x}`;
            if (currentTree > max) {
                if (!localMaxes[id]) {
                    localMaxes[id] = id;
                    totalVisibleTrees++;
                }
                max = currentTree;
            }
        }
    }

    for (let x = 0; x <= trees[0].length - 1; x++) {
        let max = -1;
        for (let y = 0; y <= trees.length - 1; y++) {
            const currentTree = trees[y][x];
            const id = `${y}:${x}`;
            if (currentTree > max) {
                if (!localMaxes[id]) {
                    localMaxes[id] = id;
                    totalVisibleTrees++;
                }
                max = currentTree;
            }
        }
    }


    for (let x = 0; x <= trees[0].length - 1; x++) {
        let max = -1;
        for (let y = trees.length - 1; y >= 0; y--) {
            const currentTree = trees[y][x];
            const id = `${y}:${x}`;
            if (currentTree > max) {
                if (!localMaxes[id]) {
                    localMaxes[id] = id;
                    totalVisibleTrees++;
                }
                max = currentTree;
            } 
        }
    }

    return totalVisibleTrees;
}

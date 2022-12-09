import { readFileSync } from 'fs';

class Solution {
    private grid: number[][];
    private readonly visibleTrees: Record<string, string> = {};

    constructor(input: string[]) {
        this.printVisibleTreeAmount(input);
    }

    private printVisibleTreeAmount(input: string[]): void {
        this.setGrid(input);
        console.log(this.getVisibleTreeAmount());
    }

    private setGrid(input: string[]): void {
        this.grid = input.map(line => Array.from(line).map(Number));
    }

    private getVisibleTreeAmount(): number {
        for (let y = 0; y <= this.grid.length - 1; y++) {
            let max = -1;
            for (let x = 0; x <= this.grid[0].length - 1; x++) {
                max = this.getHigherTreeAndAddItToVisibleOnes(y, x, max);
            }
        }

        for (let y = 0; y <= this.grid.length - 1; y++) {
            let max = -1;
            for (let x = this.grid[0].length - 1; x >= 0; x--) {
                max = this.getHigherTreeAndAddItToVisibleOnes(y, x, max);
            }
        }

        for (let x = 0; x <= this.grid[0].length - 1; x++) {
            let max = -1;
            for (let y = 0; y <= this.grid.length - 1; y++) {
                max = this.getHigherTreeAndAddItToVisibleOnes(y, x, max);
            }
        }


        for (let x = 0; x <= this.grid[0].length - 1; x++) {
            let max = -1;
            for (let y = this.grid.length - 1; y >= 0; y--) {
                max = this.getHigherTreeAndAddItToVisibleOnes(y, x, max);
            }
        }

        return Object.keys(this.visibleTrees).length;
    }

    private getHigherTreeAndAddItToVisibleOnes(y: number, x: number, highestTree: number): number {
        const currentTree = this.grid[y][x];
        if (currentTree > highestTree) {
            const id = `${y}:${x}`;
            if (!this.visibleTrees[id]) {
                this.visibleTrees[id] = id;
            }
            return currentTree;
        }
        return highestTree;
    }

}

function getInput(path: string): string[] {
    const file = readFileSync(path, 'utf-8');
    return file.split(/\r?\n/);
}

new Solution(getInput('./input.txt'));
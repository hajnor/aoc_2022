import { readFileSync } from 'fs';


interface Position {
    y: number;
    x: number;
}

class Solution {
    private startPosition: Position;
    private endPosition: Position;
    private readonly currentRoute: string[] = [];
    private readonly alternativeRoutes: Record<string, Position[]> = {};
    private readonly grid: number[][] = [];
    private visited = 0;

    constructor() {
        this.printResult(this.getInput());
    }

    private getInput(): string[] {
        const file = readFileSync('./input.txt', 'utf-8');
        return file.split(/\r?\n/);
    }

    private printResult(input: string[]): void {
        input.forEach((line, y) => {
            this.grid[y] = [];
            for (let x = 0; x < line.length; x++) {
                if (line[x] === 'S') {
                    this.grid[y][x] = 'a'.charCodeAt(0);
                    this.startPosition = { y, x };
                } else if (line[x] === 'E') {
                    this.grid[y][x] = 'z'.charCodeAt(0);
                    this.endPosition = { y, x };
                } else {
                    this.grid[y][x] = line[x].charCodeAt(0)
                };
            }
        });

        this.getResult();
        this.printGrid();
        console.log(this.visited)
    }

    private getResult(): void {
        let currentPosition: Position = { ...this.startPosition };
        this.addPositionToCurrentRoute(currentPosition);

        while (currentPosition.x !== this.endPosition.x || currentPosition.y !== this.endPosition.y) {
            const { nextPosition, alternatives } = this.getNextAndAlternativePosition(currentPosition);

            if (nextPosition) {
                const positionId = this.getPositionId(currentPosition);
                this.addPositionToCurrentRoute(nextPosition);
                this.setAlternativePaths(positionId, alternatives);
                this.visited++;
                currentPosition = nextPosition;
                console.log(this.currentRoute);
            } else {
                const lastPositionId = this.rollBackToAlternativeRoute(this.currentRoute[this.currentRoute.length - 1]);
                console.log(lastPositionId, !lastPositionId);
                if (!lastPositionId) { break; }
                currentPosition = this.alternativeRoutes[lastPositionId].shift();
                this.addPositionToCurrentRoute(currentPosition);
                this.visited++;
            }
        }
    }

    private rollBackToAlternativeRoute(lastPositionId: string): string {
        if (!this.currentRoute.length) {
            return null;
        } else if (this.alternativeRoutes[lastPositionId]?.length) {
            console.log("found ", lastPositionId)
            return lastPositionId;
        }

        this.visited--;
        this.currentRoute.pop();
        this.rollBackToAlternativeRoute(this.currentRoute[this.currentRoute.length - 1]);
    }

    private addPositionToCurrentRoute(currentPosition: Position): void {
        this.currentRoute.push(this.getPositionId(currentPosition));
    }

    private getPositionId(position: Position): string {
        return `${position.y}:${position.x}`;
    }

    private getNextAndAlternativePosition({ y, x }: Position): { nextPosition: Position; alternatives: Position[] } {
        let nextPosition: Position = null;
        const alternatives: Position[] = [];

        if (y < this.grid.length - 1 && this.grid[y + 1][y] - this.grid[y][x] <= 1) {
            const position: Position = { y: y + 1, x };
            if (!nextPosition && !this.isPositionIncludedInRoute(position)) {
                nextPosition = position;
            } else {
                alternatives.push(position);
            }
        }
        if (x > 0 && this.grid[y][x - 1] - this.grid[y][x] <= 1) {
            const position: Position = { y, x: x - 1 };
            if (!nextPosition && !this.isPositionIncludedInRoute(position)) {
                nextPosition = position;
            } else {
                alternatives.push(position);
            }
        }
        if (x < this.grid[y].length - 1 && this.grid[y][x + 1] - this.grid[y][x] <= 1) {
            const position: Position = { y, x: x + 1 };
            if (!nextPosition && !this.isPositionIncludedInRoute(position)) {
                nextPosition = position;
            } else {
                alternatives.push(position);
            }
        }
        if (y > 0 && this.grid[y - 1][x] - this.grid[y][x] <= 1) {
            const position: Position = { y: y - 1, x };
            if (!nextPosition && !this.isPositionIncludedInRoute(position)) {
                nextPosition = position;
            } else {
                alternatives.push(position);
            }
        }
        return { nextPosition, alternatives };
    }

    private setAlternativePaths(positionId: string, alternatives: Position[]): void {
        this.alternativeRoutes[positionId] = alternatives;
    }

    private isPositionIncludedInRoute(position: Position): boolean {
        return this.currentRoute.includes(this.getPositionId(position));
    }

    private printGrid(): void {
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                const numberChar = `${this.grid[y][x]}`;
                if (numberChar.length === 1) {
                    process.stdout.write('   ');
                }
                if (numberChar.length === 2) {
                    process.stdout.write('');
                }
                process.stdout.write(` ${this.grid[y][x]} `);
            }
            process.stdout.write('\n');
        }
    }
}

new Solution();




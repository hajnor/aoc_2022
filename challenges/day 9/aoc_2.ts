import { Dir, readFileSync } from 'fs';

enum Direction {
    Left = 'L',
    Right = 'R',
    Up = 'U',
    Down = 'D'
}

interface Coordinate {
    y: number;
    x: number;
}

class Solution {
    private static readonly tailIndex = 9;
    private readonly tailMoves: Record<string, string> = {};

    constructor(private readonly knotPositions: Coordinate[]) {
        this.addTailPositionToTailMoves();
        this.printResult(this.getMoves());
    }

    private getMoves(): string[][] {
        const file = readFileSync('./input.txt', 'utf-8');
        return file.split(/\r?\n/).map(line => line.split(' '));
    }

    private printResult(moves: string[][]): void {
        moves.forEach(([direction, steps]) => {
            this.move(direction as Direction, Number(steps));
        });

        console.log(Object.keys(this.tailMoves).length);
    }

    private move(direction: Direction, steps: number): void {
        for (let i = 0; i < steps; i++) {
            this.moveHead(direction);
            for (let j = 1; j <= Solution.tailIndex; j++) {
                const knot = this.knotPositions[j];
                const previousKnot = this.knotPositions[j - 1];
                this.moveKnotTowardsPrevious(knot, previousKnot);
            }
            this.addTailPositionToTailMoves();
        }
    }

    private moveHead(direction: Direction): void {
        switch (direction) {
            case Direction.Left:
                this.knotPositions[0].x--;
                break;
            case Direction.Right:
                this.knotPositions[0].x++;
                break;
            case Direction.Down:
                this.knotPositions[0].y++;
                break;
            case Direction.Up:
                this.knotPositions[0].y--;
                break;
        }
    }

    private moveKnotTowardsPrevious(knot: Coordinate, previousKnot: Coordinate): Coordinate {
        if (previousKnot === knot) {
            return knot;
        }

        const deltaY = previousKnot.y - knot.y;
        const deltaX = previousKnot.x - knot.x;

        if (Math.abs(deltaX) + Math.abs(deltaY) > 2) {
            if (deltaY > 0) {
                knot.y++;
            } else {
                knot.y--;
            }
            if (deltaX > 0) {
                knot.x++;
            } else {
                knot.x--;
            }

        } else {
            if (Math.abs(deltaY) === 2) {
                if (deltaY > 0) {
                    knot.y++;
                } else {
                    knot.y--;
                }
            } else if (Math.abs(deltaX) === 2) {
                if (deltaX > 0) {
                    knot.x++;
                } else {
                    knot.x--;
                }

            }
        }
        return knot;
    }

    private addTailPositionToTailMoves(): void {
        const tailPositionId = `${this.knotPositions[Solution.tailIndex].y}:${this.knotPositions[Solution.tailIndex].x}`;
        if (!this.tailMoves[tailPositionId]) {
            this.tailMoves[tailPositionId] = tailPositionId;
        }
    }
}

const knotPositions: Coordinate[] = [
    { y: 0, x: 0 },
    { y: 0, x: 0 },
    { y: 0, x: 0 },
    { y: 0, x: 0 },
    { y: 0, x: 0 },
    { y: 0, x: 0 },
    { y: 0, x: 0 },
    { y: 0, x: 0 },
    { y: 0, x: 0 },
    { y: 0, x: 0 }
];
new Solution(knotPositions);
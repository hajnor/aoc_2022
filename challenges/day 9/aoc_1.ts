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
    private readonly tailMoves: Record<string, string> = {};

    constructor(private readonly headPosition: Coordinate, private readonly tailPosition: Coordinate) {
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
            this.moveTailTowardsHead();
            this.addTailPositionToTailMoves();
        }
    }

    private moveHead(direction: Direction): void {
        switch (direction) {
            case Direction.Left:
                this.headPosition.x--;
                break;
            case Direction.Right:
                this.headPosition.x++;
                break;
            case Direction.Down:
                this.headPosition.y++;
                break;
            case Direction.Up:
                this.headPosition.y--;
                break;
        }
    }

    private moveTailTowardsHead(): void {
        if (this.headPosition === this.tailPosition) {
            return;
        }

        const deltaY = this.headPosition.y - this.tailPosition.y;
        const deltaX = this.headPosition.x - this.tailPosition.x;

        if (Math.abs(deltaX) + Math.abs(deltaY) > 2) {
            if (deltaY > 0) {
                this.tailPosition.y++;
            } else {
                this.tailPosition.y--;
            }
            if (deltaX > 0) {
                this.tailPosition.x++;
            } else {
                this.tailPosition.x--;
            }

        } else {
            if (Math.abs(deltaY) === 2) {
                if (deltaY > 0) {
                    this.tailPosition.y++;
                } else {
                    this.tailPosition.y--;
                }
            } else if (Math.abs(deltaX) === 2) {
                if (deltaX > 0) {
                    this.tailPosition.x++;
                } else {
                    this.tailPosition.x--;
                }

            }
        }
    }

    private addTailPositionToTailMoves(): void {
        const tailPositionId = `${this.tailPosition.y}:${this.tailPosition.x}`;
        if (!this.tailMoves[tailPositionId]) {
            this.tailMoves[tailPositionId] = tailPositionId;
        }
    }
}

const headPosition: Coordinate = { y: 0, x: 0 };
const tailPosition: Coordinate = { y: 0, x: 0 };
new Solution(headPosition, tailPosition);
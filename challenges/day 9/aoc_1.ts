import { readFileSync } from 'fs';

interface Position {
    y: number;
    x: number;
}

interface Motion {
    direction: Direction;
    repetitions: number;
}

enum Direction {
    Left = 'L',
    Right = 'R',
    Up = 'U',
    Down = 'D'
}

class RopeMovement {
    private readonly headPosition: Position = { y: 0, x: 0 };
    private readonly tailPosition: Position = { y: 0, x: 0 };
    private readonly visitedTailPositions: Map<string, string> = new Map();

    constructor() {
        this.addPositionToVisitedTailPositions();
    }

    public moveRopeByFile(filePath: string): void {
        const motions = this.getMotionsFromFile(filePath);

        motions.forEach(({ direction, repetitions }) => {
            for (let i = 0; i < repetitions; i++) {
                this.moveHead(direction);
                this.pullTailTowardHead();
            }
        });
    }

    public getVisitedPositionAmountByTail(): number {
        return this.visitedTailPositions.size;
    }

    private addPositionToVisitedTailPositions(): void {
        const tailPositionId = `${this.tailPosition.y}:${this.tailPosition.x}`;
        if (!this.visitedTailPositions.get(tailPositionId)) {
            this.visitedTailPositions.set(tailPositionId, tailPositionId);
        }
    }

    private getMotionsFromFile(filePath: string): Motion[] {
        const file = readFileSync(filePath, 'utf-8');
        return file.split(/\n/).map(this.convertLineToMotion);
    }

    private convertLineToMotion(line: string): Motion {
        const properties = line.split(/\s/);
        return {
            direction: properties[0] as Direction,
            repetitions: Number(properties[1])
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

    private pullTailTowardHead(): void {
        if (this.headPosition === this.tailPosition) {
            return;
        }

        const deltaY = this.headPosition.y - this.tailPosition.y;
        const deltaX = this.headPosition.x - this.tailPosition.x;

        const shouldMoveDiagonally = Math.abs(deltaX) + Math.abs(deltaY) > 2;

        if (shouldMoveDiagonally) {
            this.moveTail(deltaY, 'y');
            this.moveTail(deltaX, 'x');
        } else {
            if (Math.abs(deltaY) === 2) {
                this.moveTail(deltaY, 'y');
            } else if (Math.abs(deltaX) === 2) {
                this.moveTail(deltaX, 'x');
            }
        }
        this.addPositionToVisitedTailPositions();
    }

    private moveTail(headTailDelta: number, coordinate: keyof Position): void {
        headTailDelta > 0 ? this.tailPosition[coordinate]++ : this.tailPosition[coordinate]--;
    }
}

const ropeMovement = new RopeMovement();
ropeMovement.moveRopeByFile('./input.txt');
console.log(ropeMovement.getVisitedPositionAmountByTail());
import { readFileSync } from 'fs';

printResult(getInput());

function getInput(): string[] {
    const file = readFileSync('./input.txt', 'utf-8');
    return file.split(/\n/);
}

function printResult(input: string[]): void {
    const addx = 'addx';
    let cycle = 0;
    let spriteMiddlePosition = 1;
    const CRT: string[] = Array(240).fill('.');

    for (let i = 0; i < input.length; i++) {
        const line = input[i];
        let cycleLength = 1;
        let valueToAdd = 0;

        if (line.startsWith(addx)) {
            valueToAdd = Number(line.split(' ')[1]);
            cycleLength = 2;
        }

        for (let j = 0; j < cycleLength; j++) {
            const distanceFromSpriteMiddle = Math.abs(spriteMiddlePosition - (cycle % 40));
            if (distanceFromSpriteMiddle <= 1) {
                CRT[cycle] = '#';
            }
            cycle++;
        }
        spriteMiddlePosition += valueToAdd;
    }
    printLetters(CRT);
}

function printLetters(CRT: string[]): void {
    for (let i = 0; i < CRT.length; i++) {
        process.stdout.write(CRT[i]);
        if ((i + 1) % 40 === 0) {
            process.stdout.write('\n');
        }
    }
}
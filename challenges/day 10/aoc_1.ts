import { readFileSync } from 'fs';

printResult(getInput());

function getInput(): string[] {
    const file = readFileSync('./input.txt', 'utf-8');
    return file.split(/\n/);
}

function printResult(input: string[]): void {
    const addx = 'addx';
    let cycle = 0;
    let x = 1;
    let signalStrength = 0;

    for (let i = 0; i < input.length; i++) {
        const line = input[i];
        let cycleLength = 1;
        let valueToAdd = 0;

        if (line.startsWith(addx)) {
            valueToAdd = Number(line.split(' ')[1]);
            cycleLength = 2;
        }

        for (let j = 0; j < cycleLength; j++) {
            cycle++;
            if (cycle % 40 === 20) {
                signalStrength += cycle * x;
            }
        }

        x += valueToAdd;

        if (cycle >= 220) {
            break;
        }
    }

    console.log(signalStrength);
}
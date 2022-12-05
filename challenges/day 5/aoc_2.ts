import { readFileSync } from 'fs';

printResult(getInput());

function getInput(): string[] {
    const file = readFileSync('./input.txt', 'utf-8');
    return file.split(/\n\s*\n/);
}

function printResult(input: string[]): void {
    const crates = getCrates(input[0]);
    const instructions = getInstructions(input[1]);
    const rearrangedCrates = rearrangeCrates(crates, instructions);
    console.log(getTopCreates(rearrangedCrates));
}

function getCrates(input: string): string[][] {
    const rawCrateData = input.split(/\r?\n/);
    rawCrateData.pop();

    const cratePositions = getCratePositions(rawCrateData);

    const crates: string[][] = [];
    for(let y = rawCrateData.length - 1; y >= 0; y--) {
        for(const [index, x] of Object.entries(cratePositions)){
            const character = rawCrateData[y][x];
            if(character.match(/[A-Z]/)){
                const crateStackIndex = Number(index);
                if(!crates[crateStackIndex]) {
                    crates[crateStackIndex] = [character];
                } else {
                    crates[crateStackIndex].push(character);
                }
            }
        }
    }
    return crates;
}

function getCratePositions(rawCrateData: string[]): number[]{
    const positions: number[] = [];
    const y = rawCrateData.length - 1;

    for(let x = 0; x <= rawCrateData[y].length - 1; x++){
        const character = rawCrateData[y][x];
        if(character.match(/[A-Z]/)){
            positions.push(x);
        }
    }

    return positions;
}

function getInstructions(input: string): number[][] {
    const instructionLines = input.split(/\r?\n/);
    return instructionLines.map(line => line.split(/[^0-9]/).filter(Boolean).map(Number));
}

function rearrangeCrates(crates: string[][], instructions: number[][]): string[][] {
    for(let i = 0; i < instructions.length; i++) {
        const amount = instructions[i][0];
        const from = instructions[i][1]-1;
        const to = instructions[i][2]-1;

        const cratesToMove = crates[from].splice(-amount);
        if(!crates[to]) {
            crates[to] = cratesToMove;
        } else {
            crates[to].push(...cratesToMove);
        }
    }
    return crates;
}

function getTopCreates(rearrangedCrates: string[][]): string {
    return rearrangedCrates.map(crateStack => crateStack[crateStack.length-1]).join('');
}
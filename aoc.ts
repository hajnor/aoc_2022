import { readFileSync } from 'fs';

printResult(getInput());

function getInput(): string[] {
    const file = readFileSync('./input.txt', 'utf-8');
    return file.split(/\n/);
}

function printResult(input: string[]): void {
    console.log();
}
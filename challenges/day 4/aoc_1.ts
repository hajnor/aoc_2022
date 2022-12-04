import { readFileSync } from 'fs';

interface RangePair {
    firstRange: number[];
    secondRange: number[];
}

printResult(getInput());

function getInput(): string[] {
    const file = readFileSync('./input.txt', 'utf-8');
    return file.split(/\r?\n/);
}

function printResult(input: string[]): void {
    let totalContainedRanges = 0;

    input.forEach(item => {
        const rangePair = getRangePair(item);
        if(hasContainingRange(rangePair)) {
            totalContainedRanges++;
        }
    });

    console.log(totalContainedRanges);
}

function getRangePair(input: string): RangePair {
    const sectionsOfElves = input.split(/,/);
    const firstRange = sectionsOfElves[0].split(/-/).map(Number);
    const secondRange= sectionsOfElves[1].split(/-/).map(Number);
    return { firstRange, secondRange };
}

function hasContainingRange({ firstRange, secondRange }: RangePair): boolean {
    return isRangeFullyContained(firstRange, secondRange) || isRangeFullyContained(secondRange, firstRange);
}

function isRangeFullyContained(range1: number[], range2: number[]): boolean {
    return range1[0] >= range2[0] && range1[1] <= range2[1];
}


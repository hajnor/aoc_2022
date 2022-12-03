import { readFileSync } from 'fs';

printResult(getInput());

function getInput(): string[] {
    const file = readFileSync('./input.txt', 'utf-8');
    return file.split(/\n/);
}

function printResult(input: string[]): void {
    let totalPriority = 0;

    for(let index = 0; index < input.length / 3; index++){
        const groupIndexStart = index * 3;
        const group = input.slice(groupIndexStart, groupIndexStart + 3);
        const badge = findCommonLetter(group);
        totalPriority += getPriority(badge);
    }

    console.log(totalPriority);
}

function findCommonLetter(elves: string[]): string {
    for(let i = 0; i < elves[0].length; i++){
        const currentLetter = elves[0][i];
        if(elves[1].includes(currentLetter) && elves[2].includes(currentLetter)){
            return currentLetter;
        }
    }
    return '';
}

function getPriority(letter: string): number {
    const letterCharCode = letter.charCodeAt(0);
    if(letterCharCode >= 97){
        return letterCharCode - 97 + 1;
    } else {
        return letterCharCode - 65 + 27;
    }
}

import { readFileSync } from 'fs';

printResult(getInput());

function getInput(): string[] {
    const file = readFileSync('./input.txt', 'utf-8');
    return file.split(/\n/);
}

function printResult(input: string[]): void {
    let totalPriority = 0;

    input.forEach(item => {
        const firstCompartment = item.slice(0, item.length/2);
        const secondCompartment = item.slice(item.length/2, item.length);
        const commonLetter = findCommonLetter(firstCompartment, secondCompartment);
        totalPriority += getPriority(commonLetter);
    });

    console.log(totalPriority);
}

function findCommonLetter(firstCompartment: string, secondCompartment: string): string {
    for(let i = 0; i < firstCompartment.length; i++){
        if(secondCompartment.includes(firstCompartment[i])){
            return firstCompartment[i];
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

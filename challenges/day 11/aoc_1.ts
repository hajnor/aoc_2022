import { readFileSync } from 'fs';

enum MonkeyAttribute {
    StartItems = 'Starting items:',
    Operation = 'Operation:',
    Test = 'Test: divisible by',
    IfTrue = 'If true: throw to monkey',
    IfFalse = 'If false: throw to monkey'
}

interface Monkey {
    items: number[];
    inspectionAmount: number;
    operation?: string;
    testDivision?: number;
    trueMonkeyIndex?: number;
    falseMonkeyIndex?: number;
}

class Solution {
    private readonly monkeys: Monkey[] = [];

    constructor(rounds: number) {
        this.printResult(this.getInput(), rounds);
    }

    private getInput(): string[] {
        const file = readFileSync('./input.txt', 'utf-8');
        return file.split(/\r?\n/);
    }

    private printResult(input: string[], rounds: number): void {
        this.setMonkeys(input);
        this.inspectItems(rounds);
        console.log(this.getMonkeyBusiness());
    }

    private setMonkeys(input: string[]): void {
        input.forEach(attribute => {
            if (attribute.includes(MonkeyAttribute.StartItems)) {
                const items = attribute.split(MonkeyAttribute.StartItems)[1].trim().split(',').map(Number);
                this.monkeys.push({ items, inspectionAmount: 0 });
            } else if (attribute.includes(MonkeyAttribute.Operation)) {
                this.monkeys[this.monkeys.length - 1].operation = attribute.split(MonkeyAttribute.Operation)[1].trim().replace(/new/g, 'newWorryLevel');
            } else if (attribute.includes(MonkeyAttribute.Test)) {
                this.monkeys[this.monkeys.length - 1].testDivision = Number(attribute.split(MonkeyAttribute.Test)[1]);
            } else if (attribute.includes(MonkeyAttribute.IfTrue)) {
                this.monkeys[this.monkeys.length - 1].trueMonkeyIndex = Number(attribute.split(MonkeyAttribute.IfTrue)[1]);
            } else if (attribute.includes(MonkeyAttribute.IfFalse)) {
                this.monkeys[this.monkeys.length - 1].falseMonkeyIndex = Number(attribute.split(MonkeyAttribute.IfFalse)[1]);
            }
        });
    }

    private inspectItems(roundAmount: number): void {
        for (let round = 0; round < roundAmount; round++) {
            for (let monkeyIndex = 0; monkeyIndex < this.monkeys.length; monkeyIndex++) {
                const monkey = this.monkeys[monkeyIndex];
                const itemsLength = this.monkeys[monkeyIndex].items.length;

                for (let itemIndex = 0; itemIndex < itemsLength; itemIndex++) {
                    let newWorryLevel = 0;
                    const old = monkey.items.shift();
                    monkey.inspectionAmount++;
                    eval(monkey.operation);
                    newWorryLevel = Math.floor(newWorryLevel / 3);
                    const newMonkeyIndex = newWorryLevel % monkey.testDivision === 0 ? monkey.trueMonkeyIndex : monkey.falseMonkeyIndex;
                    this.monkeys[newMonkeyIndex].items.push(newWorryLevel);
                }
            }
        }
    }

    private getMonkeyBusiness(): number {
        let highest = 0;
        let secondHighest = 0;
        this.monkeys.map(({ inspectionAmount }) => {
            if (inspectionAmount > secondHighest) {
                if (inspectionAmount > highest) {
                    secondHighest = highest;
                    highest = inspectionAmount;
                } else {
                    secondHighest = inspectionAmount;
                }
            }
        });
        return highest * secondHighest;
    }
}

new Solution(20);

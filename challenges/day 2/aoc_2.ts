import { readFileSync } from 'fs';

const file = readFileSync('./input.txt', 'utf-8');
const input = file.split(/\r?\n/);

const rockSign = 'A';
const paperSign = 'B';
const scissorsSign = 'C';
const signValuePair: Record<string,number> = {
	[rockSign]: 1,
	[paperSign]: 2,
	[scissorsSign]: 3
}
const winKeyLoseValue: Record<string,string> = {
	[rockSign]: scissorsSign,
	[paperSign]: rockSign,
	[scissorsSign]: paperSign
}

let totalScoreOfCurrentPlayer = 0;

function getPoints(opponentChoice: string, result: 'win' | 'lose' | 'draw'): number {
	if(result === 'lose'){
		const loseValue = winKeyLoseValue[opponentChoice];
		return signValuePair[loseValue];
	}
	else if(result === 'win') {
		let result = 0;
		Object.entries(winKeyLoseValue).forEach(([winKey, loseValue]) => {
			if(loseValue === opponentChoice) {
				result = signValuePair[winKey];
			}
		});
		return result;
	}

	return signValuePair[opponentChoice];
}


input.forEach(item => {
	const choicesForTheMatch =  item.split(/ /);

	const opponentChoice = choicesForTheMatch[0];
	const matchResult = choicesForTheMatch[1];

	if(matchResult === 'Z'){
		totalScoreOfCurrentPlayer += (6 + getPoints(opponentChoice, 'win'));
	} else if(matchResult === 'Y') {
		totalScoreOfCurrentPlayer += (3 + getPoints(opponentChoice, 'draw'));
	} else if(matchResult === 'X') {
		totalScoreOfCurrentPlayer += (0 + getPoints(opponentChoice, 'lose'));
	}
});

console.log(totalScoreOfCurrentPlayer);
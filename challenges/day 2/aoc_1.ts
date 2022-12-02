import { readFileSync } from 'fs';

const file = readFileSync('./input.txt', 'utf-8');
const input = file.split(/\r?\n/);

const rockSigns = ['A', 'X'];
const paperSigns = ['B', 'Y'];
const scissorsSigns = ['C', 'Z'];

let totalScoreOfCurrentPlayer = 0;

function isPlayerWon(playerChoice: string, opponentChoice: string,): boolean {
    return (rockSigns.includes(playerChoice) && scissorsSigns.includes(opponentChoice)) ||
    (paperSigns.includes(playerChoice) && rockSigns.includes(opponentChoice)) ||
    (scissorsSigns.includes(playerChoice) && paperSigns.includes(opponentChoice));
}

input.forEach(item => {
    const choicesForTheMatch =  item.split(/ /);

    const opponentChoice = choicesForTheMatch[0];
    const currentPlayerChoice = choicesForTheMatch[1];

    const isCurrentPlayerWon = isPlayerWon(currentPlayerChoice, opponentChoice);
    const isOpponentWon = isPlayerWon(opponentChoice, currentPlayerChoice);

    if(isCurrentPlayerWon){
        totalScoreOfCurrentPlayer += 6;
    } else if(!isCurrentPlayerWon && !isOpponentWon) {
        totalScoreOfCurrentPlayer += 3;
    }

    let extraPointForSigns = currentPlayerChoice === 'X' ? 1 : currentPlayerChoice === 'Y' ? 2 : 3;
    totalScoreOfCurrentPlayer += extraPointForSigns;
});

console.log(totalScoreOfCurrentPlayer);
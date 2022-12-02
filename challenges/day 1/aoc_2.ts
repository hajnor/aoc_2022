import { readFileSync } from 'fs';

const file = readFileSync('./input.txt', 'utf-8');
const input = file.split(/\n/);

const elfCalories: number[] = [];
let nextElf = true;
let elfIndex = -1;

input.forEach(item => {
    const foodCalorie =  item.split(/\r/)[0];

    if(nextElf){
        elfIndex++;
        elfCalories[elfIndex] = 0;
        nextElf = false;
    }

    if(!foodCalorie){
        nextElf = true;
    } else {
        elfCalories[elfIndex] += Number(foodCalorie);
    }
})

const sortedCalories = elfCalories.sort((a,b) => b-a );
const sumOfTheThreeHighestCalories = sortedCalories[0] + sortedCalories[1] + sortedCalories[2];

console.log(sumOfTheThreeHighestCalories);
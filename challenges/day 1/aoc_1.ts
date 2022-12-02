import { readFileSync } from 'fs';

const file = readFileSync('./input.txt', 'utf-8');
const input = file.split(/\n/);

let localMaxCalorie = 0;
let maxCalorie = 0;
let nextElf = true;

input.forEach(item => {
    const foodCalorie =  item.split(/\r/)[0];

    if(nextElf){
        if(maxCalorie < localMaxCalorie){
            maxCalorie = localMaxCalorie;
        }
        localMaxCalorie = 0;
        nextElf = false;
    }

    if(!foodCalorie){
        nextElf = true;
    } else {
        localMaxCalorie += Number(foodCalorie);
    }
})

console.log(maxCalorie);





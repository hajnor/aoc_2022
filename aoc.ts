import { readFileSync } from 'fs';

const file = readFileSync('./input.txt', 'utf-8');
const input = file.split(/\r?\n/);

console.log(input);
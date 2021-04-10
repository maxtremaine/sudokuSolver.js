import { Cell, sudokuFileToString, validateSudokuFile,
	validateSudokuString, validatePuzzle } from './puzzle.mjs';
import { changeCharacter, countCharacterInString } from './components.mjs';
import { readFile } from 'fs/promises';

const startPuzzle = await readFile('./io/start.sudoku', 'utf-8');

if(!validateSudokuFile(startPuzzle)) throw 'This is not a valid sudoku file.';

const sudokuString = sudokuFileToString(startPuzzle);

if(!validateSudokuString(sudokuString)) throw 'This is not a valid sudoku string.';
if(!validatePuzzle(sudokuString)) throw 'This is not a valid puzzle.';

let solved = false;
let threads = [ sudokuString ];

while(!solved) {
	let newThreads = [];
	
	for(const thread of threads) {
		const sortedUnderscores = Array.from(thread)
			.map((char, i) => {
				return char === '_' ? Cell({
					index: i,
					value: char,
					sudokuString: thread
				}) : 'X'
			})
			.filter(cell => cell !== 'X')
			.sort((a, b) => (
				a.possibleValues.length - b.possibleValues.length
			));
		if(sortedUnderscores.length === 0) {
			solved = true;
			newThreads = [ thread ];
			break;
		}
		sortedUnderscores[0].possibleValues.forEach(possibleValue => {
			const newThread = changeCharacter({
				index: sortedUnderscores[0].index,
				value: possibleValue
			})(thread)

			if(validatePuzzle(newThread)) newThreads.push(newThread);
		});
	}

	threads = newThreads;
	console.log(`${threads.length} threads.`)
}
console.log(threads[0])
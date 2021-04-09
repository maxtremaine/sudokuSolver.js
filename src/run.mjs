import { Cell, sudokuFileToString, validateSudokuFile,
	validateSudokuString, validatePuzzle } from './puzzle.mjs';
import { changeCharacter, countCharacterInString } from './components.mjs';
import { readFile } from 'fs/promises';

const startPuzzle = await readFile('./io/start.sudoku', 'utf-8');

if(!validateSudokuFile(startPuzzle)) throw 'This is not a valid sudoku file.';

const sudokuString = sudokuFileToString(startPuzzle);

if(!validateSudokuString(sudokuString)) throw 'This is not a valid sudoku string.';
if(!validatePuzzle(sudokuString)) throw 'This is not a valid puzzle.';

console.log(sudokuString);

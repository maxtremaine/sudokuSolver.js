const { checkForDuplicates } = require('./utilities');

const validateSudokuFile = sudokuFile => {
    const correctLength = sudokuFile.length === 167 ? true : false;
    const result = correctLength ? sudokuFile : 'err';
    if(result === 'err') throw 'The .sudoku file is not valid.';
    return result;
};

const validateSudokuString = sudokuString => {
    const pattern = /(_|[1-9]){81}/
    const result = pattern.test(sudokuString) ? sudokuString : 'err';
    if(result === 'err') throw 'The sudoku string is not valid.';
    return result;
};

const sudokuFileToString = encodingArray => sudokuFile => (
    encodingArray.map(index => sudokuFile[index]).join('')
);

const checkGroup = sudokuString => {
    if(sudokuString.length !== 9) throw 'A group must be 9 characters long.';
    const numbers = Array.from(sudokuString).filter(char => char !== '_');
    return checkForDuplicates(numbers);
};

module.exports = { validateSudokuFile, validateSudokuString, sudokuFileToString, checkGroup }
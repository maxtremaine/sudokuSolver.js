const { addDataToObj, runAndPass, addDataFromFile } = require('./utilities');
const { validateSudokuFile, validateSudokuString, sudokuFileToString, checkGroup } = require('./Puzzle');
const rules = require('./sudokuRules.json');

const addStartPuzzle = addDataFromFile({
    key: 'startFile',
    path: 'io/start.sudoku'
});

const addStartString = obj => (
    addDataToObj({
        key: 'startString',
        data: sudokuFileToString(obj.rules.fileEncoding)(obj.startFile)
    })(obj)
);

Promise.resolve({ rules })
    .then(addStartPuzzle)
    .then(runAndPass({ inputPath: 'startFile', fnc: validateSudokuFile }))
    .then(addStartString)
    .then(runAndPass({ inputPath: 'startString', fnc: validateSudokuString }))
    .then(data => console.log(checkGroup(data.startString.substring(0,9))))
    //.then(console.log)
    .catch(console.error)
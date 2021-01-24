const { readFile } = require('fs/promises');

const addDataToObj = ({ key, data }) => obj => {
    obj[key] = data;
    return obj;
};

const runAndPass = ({ inputPath, fnc }) => obj => {
    fnc(obj[inputPath]);
    return obj;
};

const addDataFromFile = ({ key, path }) => obj => (
    readFile(path, 'utf-8')
        .then(content => (
            addDataToObj({ key, data: content})(obj)
        ))
);

const checkForDuplicates = str => {
    const set = new Set(str)
    return str.length === set.size
}

module.exports = { addDataToObj, runAndPass, addDataFromFile, checkForDuplicates }
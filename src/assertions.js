const isSudokuFile = (string) => {
    return string = string.match(/^(\s|\n|\||_|-|[1-9]|[a-i]){167}$/g)
}

module.exports = { isSudokuFile }
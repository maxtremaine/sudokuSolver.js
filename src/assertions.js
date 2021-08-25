const isSudokuFile = st => {
    const check = st.match(/^(\s|\n|\||_|-|[1-9]|[a-i]){167}$/g)
    if(check) return check[0] === st
    return false
}

const isSudokuString = st => {
    const check = st.match(/^(_|[1-9]){81}$/g)
    if(check) return check[0] === st
    return false
}

module.exports = { isSudokuFile, isSudokuString }
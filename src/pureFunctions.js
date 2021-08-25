const getMissingDigits = digits => {
    return Array.from(Array(10).keys())
        .slice(1)
        .map(key => String(key))
        .filter(digit => !digits.includes(digit))
}

const replaceSubstring = ({ index, substring }) => st => {
    return st.substring(0, index) + substring + st.substring(index + 1)
}

module.exports = { getMissingDigits, replaceSubstring }
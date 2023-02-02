// Write a function that orders a given array of strings, by a length in ascending order as primary criteria, 
// and by alphabetical value in ascending order as second criteria. The comparison should be case-insensitive.
// The input comes as an array of strings.
// The output is the elements of the ordered array of strings, printed each on a new line.

function solve(arr) {
    result = []
    arr.sort((a, b) => a.length - b.length || a.localeCompare(b))
    return arr.join('\n')
}

console.log(solve(['alpha', 'beta', 'gamma']))
console.log(solve(['Isacc', 'Theodor', 'Jack', 'Harrison', 'George']))
console.log(solve(['test', 'Deny', 'omen', 'Default']))
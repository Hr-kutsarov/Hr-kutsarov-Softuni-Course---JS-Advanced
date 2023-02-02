// Write a function that checks if a given matrix of numbers is magical. A matrix is magical if the sums of the cells of every row and every column are equal. 
// The input comes as an array of arrays, containing numbers (number 2D matrix). The input numbers will always be positive.
// The output is a Boolean result indicating whether the matrix is magical or not.

function solve(matrix) {
    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[i].length; j++) {
            console.log(matrix[i][j])
        }
    }
}

solve([
    [4, 5, 6],
    [6, 5, 4],
    [5, 5, 5]
])
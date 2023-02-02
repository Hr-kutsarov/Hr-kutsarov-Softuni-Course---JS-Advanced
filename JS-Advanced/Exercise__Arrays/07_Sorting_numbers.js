function solve(arr) {
    result = []
    let sorted_arr = arr.sort((a, b) => a - b);
    while (sorted_arr.length > 0) {
        result.push(sorted_arr.shift())
        result.push(sorted_arr.pop())
    }
    return result
}

console.log(solve([1, 65, 3, 52, 48, 63, 31, -3, 18, 56]))
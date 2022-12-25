function solve(string) {
    var stringNew = "";
    for (let i = 0; i < string.length; i++) {
        if (string[0] === string[i]) {
            stringNew += string[i];
        }

    }
    return stringNew === string;
}

console.log(solve('2222224222'))
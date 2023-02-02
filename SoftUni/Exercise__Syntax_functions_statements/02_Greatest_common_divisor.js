function Solve(num1, num2) {
    let x = Math.abs(num1);
    let y = Math.abs(num2);
    while(y) {
    var t = y;
    y = x % y;
    x = t;
}
    return x;
}

console.log(Solve(15, 5))
console.log(Solve(2154, 458))
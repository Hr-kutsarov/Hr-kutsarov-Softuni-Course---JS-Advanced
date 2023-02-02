function solve(year, month, day) {
    let d = new Date(year, month-1, day-1);
    let dd = d.toISOString().slice(0,10).split('-')
    let myYear = dd[0];
    let myMonth = Number(dd[1]);
    let myDay = Number(dd[2]);
    return `${myYear}-${myMonth}-${myDay}`
}

console.log(solve(2015, 5, 10))
console.log(solve(2016, 5, 1))
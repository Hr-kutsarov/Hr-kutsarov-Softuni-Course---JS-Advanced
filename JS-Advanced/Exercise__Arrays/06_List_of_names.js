function solve(arr) {
    let a = arr.sort()
    result = []
    for (const [index, element ] of a.entries()) {
        result.push(`${index+1}.${element}`)
    }
    return result.join('\n')
}


console.log(solve(["John", "Bob", "Christina", "Ema"]))
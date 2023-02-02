// •	chop - divide the number by two
// •	dice - square root of a number
// •	spice - add 1 to the number
// •	bake - multiply number by 3
// •	fillet - subtract 20% from the number

function solve(param, ...args) {
    let results = []
    let number = Number(param);
    // define actions
    let actions = {
        'chop': (a) => {
            return a/2
        },
        'dice': (a) => {
            return Math.sqrt(a)
        },
        'spice': (a) => {
            return a + 1
        },
        'bake': (a) => {
            return a * 3
        },
        'fillet': (a) => {
            return a * 0.8
        },
    }
    // iterate over the array and perform the action
    for (let i=0; i < args.length; i++) {
        number = actions[args[i]](number)
        // TODO 4.800000000000001 fix this value
        results.push(number)
    }
    // return the results, each on new row
    return results.join('\n')
}
    

console.log(solve('32', 'chop', 'chop', 'chop', 'chop', 'chop'))
console.log(solve('9', 'dice', 'spice', 'chop', 'bake', 'fillet'))
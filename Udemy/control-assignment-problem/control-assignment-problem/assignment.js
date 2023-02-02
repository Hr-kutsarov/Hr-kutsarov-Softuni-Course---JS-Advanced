const randomNumber = Math.random(); // produces random number between 0 (including) and 1 (excluding)

// task 4: create another random number
const anotherNumber = Math.random();

console.log(randomNumber)
console.log(anotherNumber) // display that too


// add functionality so that it only shows an alert if BOTH are > 0.7 OR at least one of the two is not greater than 0.2
    
if (randomNumber > 0.7 && anotherNumber > 0.7 || randomNumber < 0.2 && anotherNumber < 0.2) {
    alert(`${randomNumber}`)
}    


const arr = [1, 2, 3, 4, 5, 6];
for (let i in arr) {
    // instead of printing all values one after another in the console 
    // we push them into array and then we print it out 

    let pretty_array = [];
    pretty_array.push(`=:<-${i}->}:=\n`)
    console.log(pretty_array.join(''))
}


let result = [];
for (let i = arr.length; i >= 0; i--) {
    result.push(arr[i])
    // TODO: Fix the array as it first comes with Undefined, because it first reads the length of the array 
    // and in the current moment it's Falsy?

    // Edit: added temp solution by slicing the first element off.
}
console.log(result)

// console.log(result.slice(1))

if (result[0] == undefined) {
    throw {message: 'All values inside the array must be defined!'}
}


function breakMe(param) {
    // Todo: Throw your own error here
    if (param == 3) {
        throw {message: 'ERROR!'}
    }
}

function main() {
    // Todo: Handle breakMe()'s error with grace
    for (let i = 0; i < 5; i++) {
        if (i === 4) {
            breakMe(i);
        }
        console.log(i)
    }

}
// Write a function that calculates how long it takes a student to get to university. 
// The function takes three numbers:
// •	The first is the number of steps the student takes from their home to the university
// •	Тhe second number is the length of the student's footprint in meters
// •	Тhe third number is the student speed in km/h
// Every 500 meters the student rests and takes a 1-minute break.
// Calculate how long the student walks from home to university and print on the console the result in the following format:
// `hours:minutes:seconds`.
// The input comes as three numbers.
// The output should be printed on the console.

function solve(number_of_steps, len_footprint_m, speed) {
    // time = distance/speed
    let speed_mps = speed/3.6;
    let distance = number_of_steps * len_footprint_m;
    let extra_minutes =  Math.floor(distance / 500)
    let time = distance / speed_mps
    let seconds = Math.round(time % 60).toLocaleString('en-US', {minimumIntegerDigits: 2})
    let minutes = Math.floor((time/60) + extra_minutes).toLocaleString('en-US', {minimumIntegerDigits: 2});
    let hours = Math.floor(minutes / 60).toLocaleString('en-US', {minimumIntegerDigits: 2});

    return `${hours}:${minutes}:${seconds}`
}


console.log(solve(4000, 0.60, 5))
console.log(solve(2564, 0.70, 5.5))

function solve(fruit, weightInGrams, pricePerKg){
    let weight = weightInGrams / 1000
    let cost = weight * pricePerKg
    console.log(`I need $${cost.toFixed(2)} to buy ${weight.toFixed(2)} kilograms ${fruit}.`)
}


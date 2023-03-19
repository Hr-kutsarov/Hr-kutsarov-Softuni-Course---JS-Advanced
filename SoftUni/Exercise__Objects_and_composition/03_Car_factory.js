// Write a program that assembles a car by giving requirements out of existing components. The client will place an order in the
// form of an object describing the car. You need to determine which parts to use to fulfill the client’s order. You have the following parts in storage:
// An engine has power (given in horsepower) and volume (given in cubic centimeters). Both of these values are numbers.
// When selecting an engine, pick the smallest possible that still meets the requirements.
// Small engine: { power: 90, volume: 1800 }
// Normal engine: { power: 120, volume: 2400 }
// Monster engine: { power: 200, volume: 3500 }
// A carriage has a type and color. Both of these values are strings. You have two types of carriages in storage and can paint them any color.
// Hatchback: { type: 'hatchback', color: <as required> }
// Coupe: { type: 'coupe', color: <as required> }
// The wheels will be represented by an array of 4 numbers, each number represents the diameter of the wheel in inches.
// The size can only be an odd number. Round down any requirements you receive to the nearest odd number.

function assembleCar(carDescription) {
  let obj = {};

  obj.model = carDescription.model;
  obj.carriage = { type: carDescription.carriage, color: carDescription.color };

  let x = Number(carDescription.wheelsize);
  if (x % 2 === 0) {
    x--;
  }
  obj.wheels = [x, x, x, x];

  let requiredEngine = carDescription.power;
  if (requiredEngine <= 90) {
    obj.power = {
      engine: { power: 90, volume: 1800 },
    };
  } else if (requiredEngine <= 120) {
    obj.power = {
      engine: { power: 120, volume: 2400 },
    };
  } else {
    obj.power = {
      engine: { power: 200, volume: 3500 },
    };
  }

  return obj;
}

console.log(
  assembleCar({
    model: "VW Golf II",
    power: 90,
    color: "blue",
    carriage: "hatchback",
    wheelsize: 14,
  })
);

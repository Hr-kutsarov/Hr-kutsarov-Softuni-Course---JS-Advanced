class Garden {
  constructor(spaceAvailable) {
    this.spaceAvailable = Number(spaceAvailable);
    this.plants = [];
    this.storage = [];
  }

  addPlant(plantName, spaceRequired) {
    if (this.spaceAvailable < spaceRequired) {
      throw new Error("Not enough space in the garden.");
    } else {
      let plant = {
        plantName: plantName,
        spaceRequired: spaceRequired,
        ripe: false,
        quantity: 0,
      };
      this.spaceAvailable -= spaceRequired;
      this.plants.push(plant);
      return `The ${plantName} has been successfully planted in the garden.`;
    }
  }

  ripenPlant(plantName, quantity) {
    let found_plant = this.plants.find(
      (plant) => plant.plantName === plantName
    );
    if (!found_plant) {
      throw new Error(`There is no ${plantName} in the garden.`);
    } else if (found_plant.ripe) {
      throw new Error("The plant is already ripe");
    } else if (quantity <= 0) {
      throw new Error("The quantity cannot be zero or negative");
    } else if (quantity === 1) {
      found_plant.ripe = true;
      found_plant.quantity = quantity;
      return `${quantity} ${found_plant.plantName} has successfuly ripened.`;
    } else if (quantity > 1) {
      found_plant.ripe = true;
      found_plant.quantity = quantity;
      return `${quantity} ${found_plant.plantName}s have successfuly ripened.`;
    }
  }

  harvestPlant(plantName) {
    let foundPlant = this.plants.find((plant) => plant.plantName === plantName);
    if (!foundPlant) {
      throw new Error(`There is no ${plantName} in the garden.`);
    } else if (!foundPlant.ripe) {
      throw new Error(
        `The ${foundPlant.plantName} cannot be harvested before it is ripe.`
      );
    } else {
      this.spaceAvailable += foundPlant.spaceRequired;

      let storedPlant = {
        plantName: foundPlant.plantName,
        quantity: foundPlant.quantity,
      };

      this.storage.push(storedPlant);
      this.plants.pop(foundPlant);

      return `The ${plantName} has been successfully harvested.`;
    }
  }

  generateReport() {
    let result = `The garden has ${this.spaceAvailable} free space left.\n`;
    result += `Plants in the garden: `;
    this.plants
      .sort((a, b) => a.plantName.localeCompare(b.plantName))
      .forEach((plant) => (result += `${plant.plantName}, `));
    result = result.slice(0, result.length - 2);
    result += "\n";

    if (!this.storage.length) {
      result += `Plants in storage: The storage is empty.\n`;
    } else {
      result += `Plants in storage: `;
      this.storage.forEach(
        (plant) => (result += `${plant.plantName} (${plant.quantity}), `)
      );
      result = result.slice(0, result.length - 2);
      result += "\n";
    }

    return result;
  }
}

const myGarden = new Garden(250);
console.log(myGarden.addPlant("apple", 20));
console.log(myGarden.addPlant("orange", 200));
console.log(myGarden.addPlant("raspberry", 10));
console.log(myGarden.ripenPlant("apple", 10));
console.log(myGarden.ripenPlant("orange", 1));
console.log(myGarden.harvestPlant("orange"));
console.log(myGarden.generateReport());

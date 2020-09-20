class Population {
  constructor(target, mutationRate, res, populationSize) {
    this.population = []; // Array to hold the current population
    this.matingPool = []; // ArrayList which we will use for our "mating pool"
    this.generations = 0; // Number of generations
    this.finished = false; // Are we finished evolving?
    this.target = target; // Target phrase
    this.mutationRate = mutationRate; // Mutation rate
    this.perfectScore = 1;
    this.res = res;

    // Guarantee a specific population size by changing the square resolution
    // as the resolution affects the number of items in population
    while ((width / this.res) * (height / this.res) > populationSize) {
      this.res++;
    }

    for (let i = 0; i < (width * height) / (this.res * this.res); i++) {
      this.population.push(new DNA(this.target.length));
    }

    this.calcFitness();
  }

  // Fill our fitness array with a value for every member of the population
  calcFitness() {
    this.population.forEach(p => p.calcFitness(this.target));
  }

  // Generate a mating pool
  naturalSelection() {
    // Clear the ArrayList
    this.matingPool = [];

    const maxFitness = this.population.reduce(
      (max, p) => (p.fitness > max ? p.fitness : max),
      0
    );

    // Based on fitness, each member will get added to the mating pool a certain number of times
    // a higher fitness = more entries to mating pool = more likely to be picked as a parent
    // a lower fitness = fewer entries to mating pool = less likely to be picked as a parent
    this.matingPool = this.population.reduce((pool, p) => {
      const n = floor(p.fitness * 1000); // Arbitrary multiplier, we can also use monte carlo method
      for (let j = 0; j < n; j++) pool.push(p);
      return pool;
    }, []);
  }

  // Create a new generation
  generate() {
    // Refill the population with children from the mating pool
    this.population = this.population.map(p => {
      if (p.fitness === 1) return p; // don't produce childs

      let a = floor(random(this.matingPool.length));
      let b = floor(random(this.matingPool.length));
      let partnerA = this.matingPool[a];
      let partnerB = this.matingPool[b];
      let child = partnerA.crossover(partnerB);
      child.mutate(this.mutationRate);
      return child;
    });
    this.generations++;
  }

  // Compute the current "most fit" member of the population
  evaluate() {
    if (this.population.every(p => p.fitness >= this.perfectScore)) {
      this.finished = true;
    }
  }

  get(pos) {
    return this.population[pos];
  }
}

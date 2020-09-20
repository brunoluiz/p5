class EntropyState {
  constructor(g) {
    this.global = g;
    this.started = new Date();
    this.axis1 = this.isLandscape() ? width : height;
    this.axis2 = this.isLandscape() ? height : width;
  }

  isLandscape() {
    return width >= height;
  }

  render() {
    frameRate(EVAL_RATE);
    background(BACKGROUND_COLOR);

    // Generate mating pool
    population.naturalSelection();
    // Create next generation
    population.generate();
    // Calculate fitness
    population.calcFitness();
    // Evaluate fitness
    population.evaluate();

    // Render population (squares)

    for (let i = 0; i < this.axis1; i += population.res) {
      for (let j = 0; j < this.axis2; j += population.res) {
        const offset = floor(sqrt(population.population.length));
        const genes = population.get(
          floor(i / population.res) + floor(j / population.res) * offset
        ).genes;

        // Draw a nice cute square
        push();
        noStroke();
        fill(color(`#${genes.join("")}`));

        const x = this.isLandscape() ? i : j;
        const y = this.isLandscape() ? j : i;
        square(x, y, population.res);
        pop();
      }
    }

    // If we found the target phrase, stop
    if (population.finished) {
      console.log("finished", {
        elapsed: (new Date() - this.started) / 1000, // gives in seconds
        generations: population.generations
      });
      noLoop();
    }
  }

  next() {
    this.global.state = new HeatDeathState(this.global);
  }
}

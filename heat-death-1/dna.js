// Returns a new hex char (used for color code)
function newHexChar() {
  return new Number(floor(random(0, 16))).toString(16);
}

class DNA {
  constructor(num) {
    // The genetic sequence
    this.genes = [];
    this.fitness = 0;
    for (let i = 0; i < num; i++) {
      this.genes[i] = newHexChar(); // Pick from range of chars
    }
  }

  // Fitness function (returns floating point % of "correct" characters)
  // Based on the distance between the target[i] and the genes[i] (valued from 0 to 16)
  // Each difference is summed and then mapped from 0 to 1
  calcFitness(t) {
    const score = this.genes.reduce(
      (acc, gene, i) => acc + abs(parseInt(t[i], 16) - parseInt(gene, 16)),
      0
    );

    this.fitness = map(score, 16 * this.genes.length, 0, 0, 1);
  }

  // Crossover
  crossover(partner) {
    // A new child
    let child = new DNA(this.genes.length);
    let midpoint = floor(random(this.genes.length)); // Pick a midpoint

    // Half from one, half from the other
    for (let i = 0; i < this.genes.length; i++) {
      if (i > midpoint) child.genes[i] = this.genes[i];
      else child.genes[i] = partner.genes[i];
    }
    return child;
  }

  // Based on a mutation probability, picks a new random character
  mutate(mutationRate) {
    this.genes = this.genes.map(g =>
      random(1) < mutationRate ? newHexChar() : g
    );
  }
}

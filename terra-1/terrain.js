// Terrain generator based on Diamond-square algorithm -- also
// known as the random midpoint displacement fractal, the
// cloud fractal or the plasma fractal.
// https://en.wikipedia.org/wiki/Diamond-square_algorithm
class Terrain {
  constructor(res, roughness) {
    this.size = Math.pow(2, res);
    this.roughness = roughness;
    this.terrain = [];
    for (let i = 0; i < this.size; i++) this.terrain[i] = [];
  }

  generate() {
    const last = this.size - 1;
    this.terrain[0][0] = this.getOffset(this.size);
    this.terrain[0][last] = this.getOffset(this.size);
    this.terrain[last][0] = this.getOffset(this.size);
    this.terrain[last][last] = this.getOffset(this.size);

    this.divide(this.size);

    return this.terrain;
  }

  // Get a random height offset based on step and roughness params
  getOffset(step) {
    const offset = (step / this.size) * random(-this.size, this.size);
    const sign = offset < 0 ? -1 : 1;
    return sign * Math.pow(abs(offset), 1 / sqrt(this.roughness));
  }

  getCellHeight(x, y, step) {
    try {
      const c = this.terrain[x][y];
      return c ? this.terrain[x][y] : this.getOffset(step);
    } catch (e) {
      // Avoids out-of-boundaries issues
      return this.getOffset(step);
    }
  }

  // Divide canvas based on step param and iterate through it
  // until stop condition
  divide(step) {
    const half = step / 2;
    if (half < 1) return; // stop condition

    // Split it in squares
    for (let x = half; x < this.size; x += step) {
      for (let y = half; y < this.size; y += step) {
        this.square(x, y, half, this.getOffset(step));
      }
    }

    this.divide(half);
  }

  average(values) {
    return values.reduce((acc, v) => acc + v, 0) / values.length;
  }

  square(x, y, size, offset) {
    // Sets the x, y to an average of the other corners
    const ave = this.average([
      this.getCellHeight(x - size, y - size, offset), // upper left
      this.getCellHeight(x + size, y - size, offset), // upper right
      this.getCellHeight(x + size, y + size, offset), // lower right
      this.getCellHeight(x - size, y + size, offset) // lower left
    ]);
    this.terrain[x][y] = ave + offset;

    // Split in diamonds
    this.diamond(x, y - size, size, this.getOffset(size));
    this.diamond(x - size, y, size, this.getOffset(size));
    this.diamond(x, y + size, size, this.getOffset(size));
    this.diamond(x + size, y, size, this.getOffset(size));
  }

  diamond(x, y, size, offset) {
    // Sets the x, y to an average of the other corners
    const ave = this.average([
      this.getCellHeight(x, y - size, offset), // top
      this.getCellHeight(x + size, y, offset), // right
      this.getCellHeight(x, y + size, offset), // bottom
      this.getCellHeight(x - size, y, offset) // left
    ]);
    try {
      this.terrain[x][y] = ave + offset;
    } catch (e) {}
  }
}

// Implements a trail drawer, keep up to `max` copies and
// decreasing its opacity as it gets to the end of life
class TrailDrawer {
  constructor(drawer, max = 50) {
    this.drawer = drawer;
    this.max = max;
    this.positions = [];
  }

  draw(pos) {
    this.positions.push(pos.copy());
    if (this.positions.length > this.max) {
      this.positions.shift();
    }

    this.positions.forEach((p, i) => {
      const c1 = this.drawer.color;
      this.drawer.color.setAlpha(map(i, 0, this.max, 0, 255));
      this.drawer.draw(p);
      this.drawer.color = c1;
    });
    return this;
  }
}

// Implements a simple circle drawer for the particle
class CircleDrawer {
  constructor(c, size) {
    this.color = color(c);
    this.size = size;
  }

  draw(pos) {
    push();
    noStroke();
    fill(this.color);
    circle(pos.x, pos.y, this.size);
    pop();
  }
}

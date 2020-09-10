// Implements a physical particle
class Particle {
  constructor(pos, drawer, mass = 1) {
    this.pos = pos.copy();
    this.vel = createVector(0, 0, 0);
    this.acc = createVector(0, 0, 0);

    this.mass = mass;
    this.drawer = drawer;
    this.cycle = false;
  }

  // Apply a force
  apply(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
    return this;
  }

  // Update parameters for force
  update() {
    // Velocity changes according to acceleration
    this.vel.add(this.acc);
    // position changes by velocity
    this.pos.add(this.vel);

    // Cycle the position always through the canvas
    if (this.cycle) {
      if (this.pos.x > windowWidth) this.pos.x = 0;
      if (this.pos.x < 0) this.pos.x = windowWidth;
      if (this.pos.y > windowHeight) this.pos.y = 0;
      if (this.pos.y < 0) this.pos.y = windowHeight;
    }

    // We must clear acceleration each frame
    this.acc.mult(0);
    return this;
  }

  // Renders on canvas
  draw() {
    this.drawer.draw(this.pos);
    return this;
  }

  run() {
    return this.update().draw();
  }
}

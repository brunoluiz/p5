// Seek behavior as described in Reynolds paper
// Boid will seek target
// https://www.red3d.com/cwr/papers/1999/gdc99steer.pdf
//
// - target: position where the behavior will be applied
class SeekBehavior {
  constructor(target) {
    this.target = target.copy();
  }

  apply(boid) {
    // What is the vector at that spot in the flow field?
    const desired = this.target;
    // Scale it up by maxspeed
    desired.mult(boid.maxSpeed);
    // Steering is desired minus velocity
    const steer = p5.Vector.sub(desired, boid.particle.vel);
    steer.limit(boid.maxForce); // Limit to maximum steering force
    boid.applyForce(steer);
  }
}

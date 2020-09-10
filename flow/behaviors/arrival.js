// Arrival behavior as described in Reynolds paper
// Boid will seek target and decrease its velocity as it get closer
// https://www.red3d.com/cwr/papers/1999/gdc99steer.pdf
//
// - target: position where the behavior will be applied
// - threshold: radisu where the velocity should start to decrease
class ArrivalBehavior {
  constructor(target, threshold = 100) {
    this.target = target;
    this.threshold = threshold;
  }

  apply(boid) {
    const desired = p5.Vector.sub(this.target, boid.particle.pos);

    const d = desired.mag();
    const mag =
      d < this.threshold
        ? map(d, 0, this.threshold, 0, boid.maxSpeed)
        : boid.maxSpeed;
    desired.setMag(mag);

    const steering = p5.Vector.sub(desired, boid.particle.vel);
    steering.limit(boid.particle.maxForce);
    boid.applyForce(steering);
  }
}

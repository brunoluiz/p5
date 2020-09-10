// Separation behavior as described in Reynolds paper
// Boid will try to keep distance from other boids
// https://www.red3d.com/cwr/papers/1999/gdc99steer.pdf
//
// - boids: list of boids which the boid should be far from
// - separation: separation threshold radius
class SeparationBehavior {
  constructor(boids, separation = 25) {
    this.boids = boids;
    this.separation = separation;
  }

  apply(b) {
    const steer = createVector(0, 0);
    let count = 0;

    // For every boid in the system, check if it's too close
    this.boids.forEach(boid => {
      const d = p5.Vector.dist(b.particle.pos, boid.particle.pos);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if (d > 0 && d < this.separation) {
        // Calculate vector pointing away from neighbor
        const diff = p5.Vector.sub(b.particle.pos, boid.particle.pos);
        diff.normalize();
        diff.div(d); // Weight by distance
        steer.add(diff);
        count++; // Keep track of how many
      }
    });

    // Average -- divide by how many
    if (count > 0) steer.div(count);

    // As long as the vector is greater than 0
    if (steer.mag() === 0) {
      return;
    }

    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(b.maxSpeed);
    steer.sub(b.particle.vel);
    steer.limit(b.maxForce);
    b.applyForce(steer);
  }
}

// Boid/Vehicle which will contain a particle and
// will have behaviours applied to it
class Boid {
  constructor(particle, maxSpeed = 4, maxForce = 0.1) {
    this.particle = particle;
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
  }

  applyForce(force) {
    this.particle.apply(force);
    return this;
  }

  applyBehavior(behaviour) {
    behaviour.apply(this);
    return this;
  }

  applyForces(forces) {
    forces.forEach(f => this.particle.apply(f));
    return this;
  }

  applyBehaviors(behaviours) {
    behaviours.forEach(b => b.apply(this));
    return this;
  }

  run() {
    return this.particle.run();
  }
}

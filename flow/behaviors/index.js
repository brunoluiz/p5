// Behavior factory
// All objects returned have a method `apply(boid: Boid)` (i miss interfaces)
class Behavior {
  static seek(target) {
    return new SeekBehavior(target);
  }

  static arrival(target, threshold) {
    return new ArrivalBehavior(target, threshold);
  }

  static flee(target) {
    return new FleeBehavior(target);
  }

  static separation(boids, separation) {
    return new SeparationBehavior(boids, separation);
  }
}

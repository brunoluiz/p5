/*
 * Assignment 3
 * Trippy flow field
 */

let boids = []; // Store boids
let flowfield; // Store flow field
let controls; // Store input controls and labels
p5.disableFriendlyErrors = true; // Improves performance -- disable for debugging!

// Bootstrap p5js
function setup() {
  createCanvas(windowWidth, windowHeight);
  flowfield = new FlowField(FLOWFIELD_RES);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const circleDrawer = new CircleDrawer(random(COLORS), PARTICLE_SIZE);
    const particle = new Particle(
      createVector(random(0, windowWidth), random(0, windowHeight)),
      TRAIL_DRAWER ? new TrailDrawer(circleDrawer, TRAIL_MAX) : circleDrawer
    );
    particle.cycle = true;

    const boid = new Boid(particle, BOID_MAX_SPEED, BOID_MAX_FORCE);
    boids.push(boid);
  }

  controls = new ParamControls();
  controls.run();
}

// Render objects on p5js canvas
function draw() {
  controls.resetOnRender.value() ? background(BACKGROUND_COLOR) : undefined;
  flowfield.display();
  boids.map(v => {
    return v
      .applyBehaviors([
        Behavior.separation(boids, controls.separation.value()),
        Behavior.seek(flowfield.lookup(v.particle.pos))
      ])
      .run();
  });
}

function keyPressed(value) {
  if (key === "?") controls.toggle();
}

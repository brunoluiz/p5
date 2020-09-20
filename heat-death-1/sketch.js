/*
 * Heat-death... From 0 to 255
 */

let population, state;

// Bootstrap p5js
function setup() {
  createCanvas(windowWidth, windowHeight);
  state = new StateManager(); // create state manager

  // create population
  population = new Population(
    TARGET.split(""),
    MUTATION_RATE,
    RES,
    POPULATION_SIZE
  );
}

function draw() {
  state.render(); // render based on state
}

// Keybindings for some of the controls
function keyPressed(value) {
  if (key === "p") isLooping() ? noLoop() : loop();
}

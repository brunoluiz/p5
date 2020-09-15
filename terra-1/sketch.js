/*
 * Terrain generator with random movements
 */

let terrain, t, controls;
let colorOff, rotateOff, translateOff, scaleOff;

// Bootstrap p5js
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  terrain = new Terrain(TERRAIN_RES, TERRAIN_SMOOTHNESS);
  reset();

  controls = new ParamControls();
  controls.prepare();
  controls.toggle();
  controls.regenerateButton.onClick = reset;
}

// Used to start/re-start params
function reset() {
  // Initialise terrain
  t = terrain.generate();

  // Initialise all required offsets
  rotateOff = random();
  translateOff = [random(), random(), random()];
  scaleOff = random();
  colorOff = random();
}

function draw() {
  // Default configs
  background(BACKGROUND_COLOR);
  noFill();

  // Rotate, translate and scale terrain
  rotateOff += controls.rotateZ.value();
  translateOff[0] += controls.translateX.value();
  translateOff[1] += controls.translateY.value();
  translateOff[2] += controls.translateZ.value();
  scaleOff += controls.scale.value();
  rotateX(ROTATE_X);
  rotateZ(noise(rotateOff) * 2 * PI);
  translate(
    sin(translateOff[0]) * TRANSLATE_MAX,
    cos(translateOff[1]) * TRANSLATE_MAX,
    sin(translateOff[1]) * 50 + 50
  );
  scale(map(noise(scaleOff), 0, 1, SCALE_MIN, SCALE_MAX));

  // As we are using WebGL, we need to offset it in the render plane
  const offset = terrain.size / 2;
  // Print generate terrain
  for (let y = 0; y < terrain.size; y++) {
    push();
    beginShape(LINES);
    for (let x = 0; x < terrain.size; x++) {
      const c = color(map(sin(colorOff), -1, 1, 50, 255), 0, 0);
      stroke(c);
      strokeWeight(STROKE_WEIGHT);
      vertex((x - offset) * CELL_SIZE, (y - offset) * CELL_SIZE, t[x][y]);
      vertex(
        (x - offset) * CELL_SIZE,
        (y + 1 - offset) * CELL_SIZE,
        t[x][y + 1]
      );
    }
    endShape();
    colorOff += 0.4; // cycle the colours
    pop();
  }
}

// Keybindings for some of the controls
function keyPressed(value) {
  if (key === "r") reset();
  if (key === "h") controls.toggle();
  if (key === "p") isLooping() ? noLoop() : loop();
}

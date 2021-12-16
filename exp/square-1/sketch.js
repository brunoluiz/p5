const fr = 60;

let vertexCtr = 0;
let scaleCtr = 0.01;
let translateCtr = 0;
let rotateCtr = 0;

let vertexStep = 0.1;
let scaleStep = 0.45;
let translateStep = 0.3;
let rotateStep = 2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noiseDetail(2, 1);
  frameRate(fr);
}

function draw() {
  background('rgba(0,0,0,.02)');
  noStroke();

  // move to the center of the canvas (not required on webgl)
  let tw = map(sin(translateCtr), -1, 1, width / 3, (width * 2) / 3);
  let th = map(cos(translateCtr), -1, 1, height / 3, (height * 2) / 3);
  translate(tw, th);
  // translate(windowWidth / 2, windowHeight / 2);

  scale(scaleCtr);
  console.log(scaleCtr);

  noFill();
  const c = map(scaleCtr, 0, 15, 0, 255);
  stroke(c, 0, 0);
  strokeWeight(0.5);
  rotate(rotateCtr % 360);
  square(-25, -25, 50);

  vertexCtr += vertexStep;
  scaleCtr += scaleStep;
  translateCtr += translateStep;
  rotateCtr += !(frameCount % 3) ? rotateStep : 0;

  if (scaleCtr >= 100) {
    scaleCtr = 0;
    scaleStep = map(noise(vertexCtr), 0, 1, 0.2, 0.75);
  }
}

function mouseClicked() {
  isLooping() ? noLoop() : loop();
}

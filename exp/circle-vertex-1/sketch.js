function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noiseDetail(2, 1);
}

let vertexCtr = 0;
let scaleCtr = 0.1;
let translateCtr = 0;

const vertexStep = 0.1;
const scaleStep = 0.01;
const translateStep = 0.3;

function draw() {
  // background('#000');
  noStroke();

  // move to the center of the canvas (not required on webgl)
  let tw = map(sin(translateCtr), -1, 1, width / 3, (width * 2) / 3);
  let th = map(cos(translateCtr), -1, 1, height / 3, (height * 2) / 3);
  translate(tw, th);

  let space = 1;

  scale(scaleCtr);

  noFill();
  beginShape();
  for (let i = 0; i < 360; i += space) {
    let xoff = map(cos(i), -1, 1, 0, 3);
    let yoff = map(sin(i), -1, 1, 0, 3);
    let n = noise(xoff + vertexCtr, yoff + vertexCtr);

    let h = map(n, 0, 1, 100, 150);
    let c = map(n, 0, 1, 100, 255);
    stroke(c, 0, 0);
    strokeWeight(0.5);

    let v = p5.Vector.fromAngle(radians(i), h);
    vertex(v.x, v.y);
  }

  endShape(CLOSE);

  vertexCtr += vertexStep;
  scaleCtr += scaleStep;
  translateCtr += translateStep;
}

function mouseClicked() {
  isLooping() ? noLoop() : loop();
}

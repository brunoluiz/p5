const CircularBuffer = (size) => {
  const objects = [];
  return {
    push: (item) => {
      objects.unshift(item);
      if (objects.length > size) objects.pop();
    },
    items: () => objects,
    length: () => objects.length(),
  };
};

let vertexCtr = 0;
let scaleCtr = 1;
let translateCtr = 0;
let objects = CircularBuffer(256);

const vertexSpacing = 5;
const vertexStep = 0.025;
const scaleStep = 0.01;

function doDrawShape(object) {
  noFill();
  beginShape();
  object.v.forEach((v) => {
    stroke(255, 0, 0);
    strokeWeight(0.5);
    vertex(v.x, v.y);
  });
  endShape(CLOSE);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noiseDetail(2, 1);
}

function draw() {
  background('#000');
  noStroke();

  // move to the center of the canvas (not required on webgl)
  translate(windowWidth / 2, windowHeight / 2);

  const vectors = [];
  for (let i = 0; i < 360; i += vertexSpacing) {
    let xoff = map(cos(i), -1, 1, 0, 3);
    let yoff = map(sin(i), -1, 1, 0, 3);
    let n = noise(xoff + vertexCtr, yoff + vertexCtr);

    let h = map(n, 0, 1, 100, 250) + scaleCtr;
    let v = p5.Vector.fromAngle(radians(i), h);
    vectors.push(v);
  }
  objects.push({ v: vectors });

  // draw
  objects.items().forEach((o) => doDrawShape(o));

  vertexCtr += vertexStep;
  scaleCtr += scaleStep;
}

function mouseClicked() {
  isLooping() ? noLoop() : loop();
}

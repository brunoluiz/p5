const CircularBuffer = (size) => {
  const objects = [];
  return {
    push: (item) => {
      objects.unshift(item);
      if (objects.length > size) objects.pop();
    },
    items: () => objects,
    item: (i) => objects[i],
    length: () => objects.length(),
  };
};

const fr = 60;
const bs = 64;

let vertexCtr = 0;
let scaleCtr = 0.1;
let translateCtr = 0;
let rotateCtr = 0;

let vertexStep = 2;
let scaleStep = 0.45;
let translateStep = 0.3;
let rotateStep = 2;

let objects = CircularBuffer(bs);

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noiseDetail(2, 1);
  frameRate(fr);
  noLoop();

  for (let i = 0; i < bs; i++) {
    objects.push({ r: i * 2 });
  }

  redraw();
}

function draw() {
  background('#000');
  noStroke();

  // move to the center of the canvas (not required on webgl)
  // let tw = map(sin(translateCtr), -1, 1, width / 3, (width * 2) / 3);
  // let th = map(cos(translateCtr), -1, 1, height / 3, (height * 2) / 3);
  // translate(tw, th);
  translate(windowWidth / 2, windowHeight / 2);

  objects.items().forEach((obj, index) => {
    push();

    noFill();
    scale(map(index, 0, bs, 0, 64) + translateCtr);
    const c = map(index, 0, bs, 0, 255);
    stroke(c, 0, 0);
    strokeWeight(1);
    rotate(obj.r);
    square(-25, -25, 50);

    pop();
  });

  if (!(frameCount % 3)) return;

  vertexCtr += vertexStep;
  scaleCtr += scaleStep;
  translateCtr += translateStep;

  if (scaleCtr >= 100) {
    scaleCtr = 0;
    scaleStep = map(noise(vertexCtr), 0, 1, 0.2, 0.75);
  }
}

function mouseClicked() {
  redraw();
}

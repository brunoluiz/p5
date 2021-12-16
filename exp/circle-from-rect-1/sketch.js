function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  noiseDetail(2, 1);
}

let start = 0;

function draw() {
  background('#000');
  noStroke();

  // move to the center of the canvas
  // translate(width / 2, height / 2);

  let space = 2;

  for (let i = 0; i < 360; i += space) {
    let xoff = map(cos(i), -1, 1, 0, 3);
    let yoff = map(sin(i), -1, 1, 0, 3);
    let n = noise(xoff + start, yoff + start);

    let h = map(n, 0, 1, -100, 200);
    let c = map(n, 0, 1, 50, 255);
    fill(c);

    rotate(space);
    rect(200, 0, h, 3);
  }

  start += 0.01;
}

// let scaleStart = 0.1
// function draw() {
//   // background('#000');
//   noStroke();

//   // move to the center of the canvas
//   // translate(width / 2, height / 2);

//   let space = 0.5;

//   scale(scaleStart);
//   for (let i = 0; i < 360; i += space) {
//     let xoff = map(cos(i), -1, 1, 0, 3);
//     let yoff = map(sin(i), -1, 1, 0, 3);
//     let n = noise(xoff + start, yoff + start);

//     let h = map(n, 0, 1, 100, 150);
//     let c = map(n, 0, 1, 50, 255);
//     stroke('#fff');
//     strokeWeight(2);

//     rotate(space);
//     point(h, 0);
//   }

//   start += 0.5;
//   scaleStart += 0.03;
// }

function mouseClicked() {
  isLooping() ? noLoop() : loop();
}

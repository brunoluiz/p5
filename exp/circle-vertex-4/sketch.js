let fft;
let mic;

function setup() {
  const cnv = createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noiseDetail(2, 1);

  cnv.mousePressed(userStartAudio);
  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);
}

let vertexCtr = 0;
let lineCtr = 1;

let vertexStep = 0.01;
let lineStep = 0.01;

function draw() {
  background('rgba(0, 0, 0, 0.075)');
  noStroke();

  // move to the center of the canvas (not required on webgl)
  translate(width / 2, height / 2);

  let space = 1;

  noFill();
  beginShape();
  for (let i = 0; i < 360; i += space) {
    let xoff = map(cos(i), -1, 1, 0, 3);
    let yoff = map(sin(i), -1, 1, 0, 3);
    let n1 = noise(xoff + vertexCtr, yoff + vertexCtr);
    let n2 = noise(xoff + lineCtr, yoff + lineCtr);

    // let cr = map(n1, 0, 1, 100, 255);
    // stroke(cr, 0, 0);
    stroke(255);

    let s = map(n2, 0, 1, 20, 40);
    strokeWeight(s);

    let h = map(n1, 0, 1, 200, 400);
    let v = p5.Vector.fromAngle(radians(i), h);
    vertex(v.x, v.y);
  }
  endShape(CLOSE);

  vertexCtr += vertexStep;
  lineCtr += lineStep;

  // vertexStep = map(mic.getLevel(), 0, 1, 0.001, 0.5);
  let spectrum = fft.analyze();
  let spectralCentroid = fft.getCentroid();
  let meanFreq = spectralCentroid / (22050 / spectrum.length);
  vertexStep = map(meanFreq, 60, spectrum.length, 0.001, 0.075);
  console.log(meanFreq);
}

function doReset() {
  vertexCtr = 0;
  lineCtr = 0;
}

function mouseClicked() {}

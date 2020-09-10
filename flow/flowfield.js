// Simulates a flow field
class FlowField {
  constructor(resolution) {
    this.resolution = resolution;
    this.cols = width / this.resolution;
    this.rows = height / this.resolution;
    this.debug = false;
    this.field = [];
    for (let i = 0; i < this.cols; i++) this.field[i] = [];

    this.reset();
  }

  display() {
    if (!this.debug) return;

    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.drawVector(
          this.field[i][j],
          i * this.resolution,
          j * this.resolution,
          this.resolution - 2
        );
      }
    }
  }

  reset() {
    // Reseed noise so we get a new flow field every time
    noiseSeed(Math.floor(random(10000)));

    let xoff = 0;
    for (let i = 0; i < this.cols; i++) {
      let yoff = 0;
      for (let j = 0; j < this.rows; j++) {
        let theta = map(noise(xoff, yoff), 0, 1, 0, TWO_PI);
        //let theta = map(sin(xoff)+cos(yoff),-2,2,0,TWO_PI);
        // Polar to cartesian coordinate transformation to get x and y components of the vector
        this.field[i][j] = createVector(cos(theta), sin(theta));
        yoff += 0.1;
      }
      xoff += 0.1;
    }

    return this;
  }

  drawVector(v, x, y, scayl) {
    push();
    var arrowsize = 4;
    // Translate to location to render vector
    translate(x, y);
    stroke(200, 100);
    // Call vector heading function to get direction (note that pointing to the right is a heading of 0) and rotate
    rotate(v.heading());
    // Calculate length of vector & scale it to be bigger or smaller if necessary
    const len = v.mag() * scayl;
    // Draw three lines to make an arrow (draw pointing up since we've rotate to the proper direction)
    line(0, 0, len, 0);
    //line(len,0,len-arrowsize,+arrowsize/2);
    //line(len,0,len-arrowsize,-arrowsize/2);
    pop();
  }

  lookup(lookup) {
    const column = Math.floor(
      constrain(lookup.x / this.resolution, 0, this.cols - 1)
    );
    const row = Math.floor(
      constrain(lookup.y / this.resolution, 0, this.rows - 1)
    );
    return this.field[column][row].copy();
  }
}

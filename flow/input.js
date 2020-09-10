// Creates control for certain parameters
// - This code is not really well organised as the others, as the
//   project wouldn't have these at the beginning
// - Useless in mobile because p5js components are too small
class ParamControls {
  constructor(boids) {
    this.boids = boids;
    this.hidden = false;
    this.controls = [];
    this.fontStyle = [
      ["font-family", "Andale Mono, Courier New, Courier"],
      ["color", "white"]
    ];
  }

  run() {
    if (controls.length) return;

    const controlsHelp = createP("Press 'h' to hide controls");
    controlsHelp.position(0, height - 50);
    controlsHelp.style("width", "100%");
    controlsHelp.style("text-align", "center");
    this.applyFontStyle(controlsHelp);
    setTimeout(() => controlsHelp.hide(), 5000);

    this.separationLabel = createP("Separation:");
    this.separationLabel.position(5, 0);
    this.applyFontStyle(this.separationLabel);
    this.separation = createSlider(0, 100, 10, 5);
    this.separation.position(5, 40);
    this.controls.push(this.separationLabel, this.separation);

    this.maxSpeedLabel = createP("Max speed:");
    this.maxSpeedLabel.position(5, 60);
    this.applyFontStyle(this.maxSpeedLabel);
    this.maxSpeed = createSlider(0, 4, BOID_MAX_SPEED, 1);
    this.maxSpeed.position(5, 100);
    this.maxSpeed.changed(() => {
      boids.forEach(v => (v.maxSpeed = this.maxSpeed.value()));
    });
    this.controls.push(this.maxSpeedLabel, this.maxSpeed);

    this.maxForceLabel = createP("Max force:");
    this.maxForceLabel.position(5, 120);
    this.applyFontStyle(this.maxForceLabel);
    this.maxForce = createSlider(0.01, 5, BOID_MAX_FORCE, 0.01);
    this.maxForce.position(5, 160);
    this.maxForce.changed(() => {
      boids.forEach(v => (v.maxForce = this.maxForce.value()));
    });
    this.controls.push(this.maxForceLabel, this.maxForce);

    this.particleSizeLabel = createP("Particle size:");
    this.particleSizeLabel.position(5, 180);
    this.applyFontStyle(this.particleSizeLabel);
    this.particleSize = createSlider(1, 20, PARTICLE_SIZE, 1);
    this.particleSize.position(5, 220);
    this.particleSize.changed(() => {
      boids.forEach(
        v =>
          (v.particle.drawer = new CircleDrawer(
            random(COLORS),
            this.particleSize.value()
          ))
      );
    });
    this.controls.push(this.particleSizeLabel, this.particleSize);

    this.resetOnRender = createCheckbox("Reset on render", RESET_ON_RENDER);
    this.resetOnRender.position(5, height - 120);
    this.applyFontStyle(this.resetOnRender);
    this.resetOnRender.value = () => this.resetOnRender.checked();
    this.controls.push(this.resetOnRender);

    this.hideControlButton = createButton("Hide controls");
    this.hideControlButton.style(this.fontStyle[0][0], this.fontStyle[0][1]);
    this.hideControlButton.style("width", "125px");
    this.hideControlButton.position(7, height - 80);
    this.hideControlButton.mousePressed(() => {
      return this.toggle();
    });
    this.controls.push(this.hideControlButton);

    this.toggleRenderButton = createButton("Pause/Continue");
    this.toggleRenderButton.style(this.fontStyle[0][0], this.fontStyle[0][1]);
    this.toggleRenderButton.style("width", "125px");
    this.toggleRenderButton.position(7, height - 55);
    this.toggleRenderButton.mousePressed(() => {
      return isLooping() ? noLoop() : loop();
    });
    this.controls.push(this.toggleRenderButton);

    this.resetButton = createButton("Reset render");
    this.resetButton.style(this.fontStyle[0][0], this.fontStyle[0][1]);
    this.resetButton.style("width", "125px");
    this.resetButton.position(7, height - 30);
    this.resetButton.mousePressed(() => {
      boids.forEach(v => {
        v.particle.pos = createVector(
          random(0, windowWidth),
          random(0, windowHeight)
        );
        v.particle.vel = createVector(0, 0);
        v.particle.acc = createVector(0, 0);
      });
      flowfield.reset();
      background(BACKGROUND_COLOR);
    });
    this.controls.push(this.resetButton);
  }

  toggle() {
    this.controls.forEach(c => (this.hidden ? c.show() : c.hide()));
    this.hidden = !this.hidden;
  }

  applyFontStyle(el) {
    this.fontStyle.forEach(s => el.style(s[0], s[1]));
  }
}

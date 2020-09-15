// Creates control for certain parameters
class ParamControls {
  constructor() {
    this.controls = [];
    this.y = 0;
  }

  nextYPos() {
    const pos = this.y + 60;
    this.y += 60;
    return pos;
  }

  prepare() {
    if (controls.length) return;

    const controlsHelp = createP("Press 'h' to toggle controls");
    controlsHelp.position(0, 10);
    controlsHelp.style("font-family", "Andale Mono, Courier New, Courier");
    controlsHelp.style("color", "white");
    controlsHelp.style("width", "100%");
    controlsHelp.style("text-align", "center");
    setTimeout(() => controlsHelp.hide(), 5000);

    this.rotateZ = new SliderControl({
      x: 5,
      y: this.nextYPos(),
      label: "rotate Z",
      min: ROTATE_MIN,
      max: ROTATE_MAX,
      initial: ROTATE_STEP_Z,
      step: ROTATE_STEP_Z / 20
    });
    this.controls.push(this.rotateZ);

    this.translateX = new SliderControl({
      x: 5,
      y: this.nextYPos(),
      label: "translate X",
      min: 0,
      max: TRANSLATE_STEP_MAX,
      initial: TRANSLATE_X_INITIAL,
      step: TRANSLATE_STEP_MAX / 50
    });
    this.controls.push(this.translateX);

    this.translateY = new SliderControl({
      x: 5,
      y: this.nextYPos(),
      label: "translate Y",
      min: 0,
      max: TRANSLATE_STEP_MAX,
      initial: TRANSLATE_Y_INITIAL,
      step: TRANSLATE_STEP_MAX / 50
    });
    this.controls.push(this.translateY);

    this.translateZ = new SliderControl({
      x: 5,
      y: this.nextYPos(),
      label: "translate Z",
      min: 0,
      max: TRANSLATE_STEP_MAX,
      initial: TRANSLATE_Z_INITIAL,
      step: TRANSLATE_STEP_MAX / 50
    });
    this.controls.push(this.translateZ);

    this.scale = new SliderControl({
      x: 5,
      y: this.nextYPos(),
      label: "scale",
      min: SCALE_STEP_MIN,
      max: SCALE_STEP_MAX,
      initial: SCALE_STEP_INITIAL,
      step: SCALE_STEP_STEP
    });
    this.controls.push(this.scale);

    this.regenerateButton = new ButtonControl({
      x: 7,
      y: height - 80,
      label: "Re-generate (r)",
      onClick: () => null
    });
    this.controls.push(this.regenerateButton);

    this.hideControlButton = new ButtonControl({
      x: 7,
      y: height - 40,
      label: "Toggle Controls (h)",
      onClick: () => this.toggle()
    });
    this.controls.push(this.hideControlButton);
  }

  toggle() {
    this.controls.forEach(c => c.toggle());
  }

  debug() {
    console.log({
      rotateX: this.rotateX.value(),
      rotateY: this.rotateY.value(),
      rotateZ: this.rotateZ.value(),
      scale: this.scale.value()
    });
  }
}

// Creates slider controls with labels
class SliderControl {
  constructor({ x, y, label, initial, min, max, step }) {
    this.hidden = false;
    this.formatter = new Intl.NumberFormat("en-UK", {
      maximumSignificantDigits: 3
    }).format;

    this.labelTxt = label;
    this.label = createP(`${label}: ${this.formatter(initial)}`);
    this.label.position(x, y);
    this.label.style("font-family", "Andale Mono, Courier New, Courier");
    this.label.style("color", "white");

    this.slider = createSlider(min, max, initial, step);
    this.slider.position(x, y + 40);
    this.slider.changed(() => {
      this.label.html(`${label}: ${this.formatter(this.slider.value())}`);
    });
  }

  format(num) {
    return new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 })
      .format;
  }

  value() {
    return this.slider.value();
  }

  toggle() {
    if (this.hidden) {
      this.label.show();
      this.slider.show();
      this.hidden = !this.hidden;
      return;
    }

    this.label.hide();
    this.slider.hide();
    this.hidden = !this.hidden;
  }
}

// Creates button controls with labels
class ButtonControl {
  constructor({ x, y, label, onClick }) {
    this.onClick = onClick;
    this.hidden = false;
    this.pos = { x, y };

    this.button = createButton(label);
    this.button.style("font-family", "Andale Mono, Courier New, Courier");
    this.button.style("width", "180px");
    this.button.style("background", "transparent");
    this.button.style("color", "#fff");
    this.button.style("border", "1px solid #fff");
    this.button.style("padding", "8px 5px");
    this.button.style("border-radius", "5px");
    this.button.position(x, y);
    this.button.mouseClicked(() => this.onClick());
  }

  value() {
    return null;
  }

  toggle() {
    // Keep buttons on mobile, allowing the to toggle or re-generate
    if (isMobileOrTablet()) {
      return;
    }

    if (this.hidden) {
      this.button.show();
      this.hidden = !this.hidden;
      return;
    }

    this.button.hide();
    this.hidden = !this.hidden;
  }
}

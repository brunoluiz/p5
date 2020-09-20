class FadeIn {
  constructor(g, milli, wrappedState, toColor) {
    this.global = g;
    this.milli = milli;
    this.opacity = 255;
    this.wrappedState = wrappedState;
    this.toColor = toColor || color(0, 0, 0);
    this.toColor.setAlpha(this.opacity);

    this.started = new Date();
    this.elapsed = 0;
  }

  render() {
    if (this.opacity <= 0) {
      this.wrappedState.render();
      return;
    }

    this.elapsed = new Date() - this.started;
    this.opacity = map(this.elapsed, 0, this.milli, 255, 0);
    this.wrappedState.render();
    this.toColor.setAlpha(this.opacity);
    background(this.toColor);
  }

  next() {
    this.wrappedState.next();
  }
}

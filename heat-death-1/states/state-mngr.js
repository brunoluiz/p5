class StateManager {
  constructor() {
    this.state = new FadeIn(
      this,
      FADE_TIME,
      new IntroState(this),
      color(0, 0, 0)
    );
  }

  render() {
    this.state.render();
  }
}

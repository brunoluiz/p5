class IntroState {
  constructor(g) {
    this.global = g;
    setTimeout(() => {
      this.global.state = new FadeOut(
        this.global,
        FADE_TIME,
        this,
        color(255, 255, 255)
      );
    }, 3000);
  }

  render() {
    background("#fff");
    push();
    textFont("Didot, Georgia");

    textSize(36);
    fill("#000");
    textStyle(BOLD);
    text("Heat Death", 20, 65);

    textSize(22);
    fill("#222");
    textStyle(NORMAL);
    text("(aka Big Chill)", 22, 100);

    textSize(16);
    fill("#444");
    textStyle(NORMAL);
    text(
      "Maximum entropy & zero available energy,\nthe ultimate fate of the universe",
      20,
      150
    );
    pop();
  }

  next() {
    this.global.state = new FadeIn(
      this.global,
      FADE_TIME,
      new EntropyState(this.global),
      color(255, 255, 255)
    );
  }
}

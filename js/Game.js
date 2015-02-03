function Game(frames) {
  this.frames = frames;
  this.currentFrame = new Frame();
  this.frameNumber = 1;
}

Game.prototype.canBowl = function() {
  return this.currentFrame.canBowl();
};

Game.prototype.bowl = function() {
  if (!currentFrame.canBowl()) {
    if (this.frameNumber === this.frames) {
      throw 'Game over'
    } else {
      this.frameNumber += 1;
      this.currentFrame = new Frame();
    }
  }
  this.currentFrame.bowl();
};
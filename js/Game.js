function Game(frames) {
  this.frames = frames || 10;
  if ((this.frames < 1) || (this.frames > 10)) { throw 'Invalid number of frames'}
  
  if (this.frames === 1) {
    this.currentFrame = new FinalFrame();
  } else {
    this.currentFrame = new Frame();
  }
  this.frameNumber = 1;
}

Game.prototype.canBowl = function() {
  return this.currentFrame.canBowl();
};

Game.prototype.bowl = function(score) {
  if (!this.currentFrame.canBowl()) {
    if (this.frameNumber === this.frames) {
      throw 'Game over'
    } else {
      this.frameNumber += 1;
      this.currentFrame = new Frame();
    }
  }
  this.currentFrame.bowl(score);
  return this;
};
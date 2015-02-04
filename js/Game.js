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
    throw 'Game over'
  } 

  this.currentFrame.bowl(score);
  if (!this.currentFrame.canBowl() && !this.currentFrame.isFinal()) {
      this.frameNumber += 1;
      if (this.frameNumber = this.frames) {
        this.currentFrame.setNextFrame(new FinalFrame());
      } else {
        this.currentFrame.setNextFrame(new Frame());
      }
      this.currentFrame = this.currentFrame.nextFrame(); 
  }
  return this;
};
function Game(frames) {
  this.frames = frames || 10;
  if ((this.frames < 1) || (this.frames > 10)) { throw 'Invalid number of frames'}
  
  if (this.frames === 1) {
    this._currentFrame = new FinalFrame();
  } else {
    this._currentFrame = new Frame();
  }
  this.frameNumber = 1;
  this._firstFrame = this._currentFrame;
}

Game.prototype.canBowl = function() {
  return this._currentFrame.canBowl();
};

Game.prototype.bowl = function(score) {
  if (!this._currentFrame.canBowl()) {
    throw 'Game over'
  } 

  this._currentFrame.bowl(score);
  if (!this._currentFrame.canBowl() && !this._currentFrame.isFinal()) {
      this.frameNumber += 1;
      if (this.frameNumber === this.frames) {
        this._currentFrame.setNextFrame(new FinalFrame());
      } else {
        this._currentFrame.setNextFrame(new Frame());
      }
      this._currentFrame = this._currentFrame.nextFrame(); 
  }
  return this;
};

Game.prototype.currentFrame = function(){
  return this._currentFrame;
};

Game.prototype.score = function() {
  var score = 0;
  var frame = this._firstFrame;
  
  do {
    score += frame.score();
    frame = frame.nextFrame();
  }
  while(!frame.isFinal());
  return score + frame.score();
}
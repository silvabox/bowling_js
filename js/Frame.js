function Frame() {
  this._bowls = [null, null];
  this._bowlIndex = 0;
  this._nextFrame = null
};

Frame.prototype.isFinal = function() {
  return false;
};

Frame.prototype.firstBowl = function() {
  return this._bowls[0];
};

Frame.prototype.secondBowl = function() {
  return this._bowls[1];
};

Frame.prototype.canBowl = function() {
  return (this._bowlIndex < 2) && !this.isAStrike();
};

Frame.prototype.bowl = function(pins) {
  if (!this.canBowl()) {
    throw 'The frame cannot accept another bowl';
  }
  this._testPins(pins);
  if (this._bowlIndex > 0) { this._testFrameScore(pins); }
  this._bowls[this._bowlIndex] = pins;
  this._bowlIndex += 1;
  return this;
};

Frame.prototype.isAStrike = function() {
  return this.firstBowl() === 10;
};

Frame.prototype.isASpare = function() {
  return (this._frameScore() === 10) && (!this.isAStrike());
};

Frame.prototype.setNextFrame = function(frame) {
  this._nextFrame = frame;
  return frame;
};

Frame.prototype.nextFrame = function(frame) {
  return this._nextFrame;
};

Frame.prototype._frameScore = function(fromIndex) {
  fromIndex = fromIndex || 0;
  var score = this._bowls[fromIndex] || 0;
  score += this._bowls[fromIndex + 1] || 0;
  return score;
};

Frame.prototype._testFrameScore = function(pins) {
  if ((this._frameScore() + pins) > 10) {
    throw 'Total score cannot exceed 10';
  }
};

Frame.prototype._testPins = function(pins) {
  if (pins > 10) {
    throw 'Pins cannot exceed 10';
  } else if (pins < 0) {
    throw 'Pins must be greater than 0'
  }
};

Frame.prototype.score = function() {
  if (this.isAStrike()) {
    return this._strikeScore();
  } else if (this.isASpare()) {
    return this._spareScore();
  } else {
    return this._frameScore();
  }
};

Frame.prototype._spareScore = function() {
  if (this._nextFrame) {
    return this._frameScore() + this._nextFrame.firstBowl()
  } else {
    return this._frameScore();
  }
}

Frame.prototype._strikeScore = function() {
 if (this._nextFrame) {
    return this._frameScore() + this._nextFrame.firstBowl() + this._nextFrame.secondBowl();
  } else {
    return this._frameScore();
  } 
}
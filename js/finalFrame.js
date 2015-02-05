function FinalFrame() {
  this._bowls = [null, null];
  this._bowlIndex = 0;
  this._nextFrame = null
}

FinalFrame.prototype = new Frame();

FinalFrame.prototype.isFinal = function() {
  return true;
};

FinalFrame.prototype.canBowl = function() {
  if (this.isAStrike() || this.isASpare()) {
    return (this._bowlIndex < 3)
  }
  return (this._bowlIndex < 2)
};

FinalFrame.prototype._testFrameScore = function(pins) {
  // ugly - needs refactoring
  if (this.isAStrike()) {
    if ((this._bowlIndex === 2) && (this._bowls[1] < 10)) {
      if (this._frameScore(1) + pins > 10) {
        throw 'Total score cannot exceed 10'
      }
    }
  }
};

FinalFrame.prototype._spareScore = function() {
  return this._frameScore() + (this._bowls[2] || 0)
}

FinalFrame.prototype._strikeScore = function() {
  return this._frameScore() + (this._bowls[2] || 0)
}
function Frame() {
  this._bowls = [null, null];
  this._bowlIndex = 0;
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

Frame.prototype.bowl = function(score) {
  if (!this.canBowl()) {
    throw 'The frame cannot accept another bowl';
  }
  this._testScore(score);
  this._bowls[this._bowlIndex] = score;
  return this;
};

Frame.prototype.isAStrike = function() {
  return this.firstBowl() === 10;
};


Frame.prototype._frameScore = function() {
  var score = this._bowls[0] || 0;
  score += this._bowls[1] || 0;
  return score;
};

Frame.prototype._testScore = function(score) {
  if (this._frameScore() + score > 10) {
    throw 'Frame score cannot exceed 10';
  } else if (score < 0) {
    throw 'Score must be greater than 0'
  }
};
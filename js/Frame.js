function Frame() {
  this._bowls = [null, null];
}

Frame.prototype.firstBowl = function(score) {
  if (score > 10) {
    throw 'Score cannot exceed 10';
  } else if (score < 0) {
    throw 'Score must be greater than 0'
  }
  this._bowls[0] = score;
  return this;
}

Frame.prototype.secondBowl = function(score) {
  this._bowls[1] = score;
  return this;
}

Frame.prototype.bowl = function(number) {
  return this._bowls[number - 1]
}
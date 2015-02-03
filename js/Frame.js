function Frame() {
  this._bowls = [null, null];
}

Frame.prototype.firstBowl = function(score) {
  this._setBowl(0, score, this._bowls[1])
  return this;
}

Frame.prototype.secondBowl = function(score) {
  this._setBowl(1, score, this._bowls[0])
  return this;
}

Frame.prototype.bowl = function(number) {
  return this._bowls[number - 1]
}

Frame.prototype._setBowl = function(bowl, score, current) {
  this._testScore(score, current)
  this._bowls[bowl] = score;
}

Frame.prototype._testScore = function(score, current) {
  if (current === null) current = 0;

  if (score + current > 10) {
    throw 'Total score cannot exceed 10';
  } else if (score < 0) {
    throw 'Score must be greater than 0'
  }
}
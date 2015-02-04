describe('Game', function() {
  beforeEach(function() {
    game = new Game();
  });

  it('it has 10 frames by default', function(){
    expect(game.frames).toEqual(10);
  });

  it('allows a bowl', function() {
    expect(game.canBowl()).toBeTruthy();
  });

  describe('bowl', function() {
    it('returns the game', function(){
      expect(game.bowl(4)).toEqual(game);
    });
  });

  describe('with one frame', function() {
    beforeEach(function() {
      game = new Game(1);
    });

    it('creates one final frame', function() {
      expect(game.currentFrame.isFinal()).toBeTruthy();
    });

    it('can bowl', function() {
      expect(game.canBowl()).toBeTruthy();
    });

    describe('when last frame is bowled', function() {
      beforeEach(function() {
        game.bowl(2).bowl(3);
      });

      it('prevents further bowls', function(){
        expect(game.canBowl()).toBeFalsy();
      });
    });
  });

  describe('with two frames', function(){
    describe('when frame finishes', function(){
      beforeEach(function(){
        frame = game.currentFrame;
        game.bowl(3).bowl(4);
      });

      it('sets next frame of the first frame', function(){
        expect(game.currentFrame).not.toEqual(frame);
        expect(frame.nextFrame()).toEqual(game.currentFrame);
      });
      
      it('sets the next frame as a final frame', function(){
        expect(game.currentFrame.isFinal()).toBeTruthy();
      });
    });
  });

  describe('score', function() {
    describe
  });
});
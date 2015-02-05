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
      expect(game.currentFrame().isFinal()).toBeTruthy();
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
    beforeEach(function() {
      game = new Game(2);
    });
    
    describe('when frame finishes', function(){
      beforeEach(function(){
        frame = game.currentFrame();
        game.bowl(3).bowl(4);
      });

      it('sets next frame of the first frame', function(){
        expect(game.currentFrame()).not.toEqual(frame);
        expect(frame.nextFrame()).toEqual(game.currentFrame());
      });
      
      it('sets the next frame as a final frame', function(){
        expect(game.currentFrame().isFinal()).toBeTruthy();
      });
    });
  });

  describe('score', function() {
    describe('for gutter game', function() {
      it('returns 0', function(){
        while(game.canBowl()) {
          game.bowl(0);
        }
        expect(game.score()).toEqual(0);
      });
    });

    describe('for full house', function() {
      it('returns 300', function(){
        while(game.canBowl()) {
          game.bowl(10);
        }
        expect(game.score()).toEqual(300);
      });
    });

    describe('straight sevens', function() {
      it('returns 70', function(){
        while(game.canBowl()) {
          game.bowl(3).bowl(4);
        }
        expect(game.score()).toEqual(70);
      });
    });

    describe('straight sevens with a first spare', function() {
      it('returns 77', function(){
        game.bowl(7).bowl(3);
        while(game.canBowl()) {
          game.bowl(4).bowl(3);
        }
        expect(game.score()).toEqual(77);
      });
    });

    describe('straight eights with a first strike', function() {
      it('returns 90', function(){
        game.bowl(10);
        while(game.canBowl()) {
          game.bowl(4).bowl(4);
        }
        expect(game.score()).toEqual(90);
      });
    });

    describe('straight nines with a final spare', function() {
      it('returns 100', function(){
        while(!game.currentFrame().isFinal()) {
          game.bowl(4).bowl(5);
        }
        game.bowl(5).bowl(5).bowl(9);
        expect(game.score()).toEqual(100);
      });
    });

    describe('straight fives with all strikes in the final frame', function() {
      it('returns 100', function(){
        while(!game.currentFrame().isFinal()) {
          game.bowl(2).bowl(3);
        }
        game.bowl(10).bowl(10).bowl(10);
        expect(game.score()).toEqual(75);
      });
    });
  });
});
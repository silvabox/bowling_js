describe('Game', function() {
  describe('with one frame', function() {
    var game = new Game(1);

    it('can bowl', function() {
      expect(game.canBowl()).toBeTruthy();
    });
  });
});
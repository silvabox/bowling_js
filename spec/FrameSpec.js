describe('Frame', function() {
  beforeEach(function() {
    frame = new Frame();
  });

  describe('canBowl', function() {
    it('returns true', function(){
      expect(frame.canBowl()).toBeTruthy();
    });
  });

  describe('first bowl', function() {
    it('returns the frame', function() {
      expect(frame.bowl(8)).toEqual(frame);
    });

    describe('under 0', function() {
      it('throws an error', function() {
        expect(function() {frame.bowl(-1)}).toThrow();
      });
    });

    describe('over 10', function() {
      it('throws an error', function() {
        expect(function() {frame.bowl(11)}).toThrow();
      });
    });
  });

  describe('firstBowl', function() {
    it('returns null at first', function(){
      expect(frame.firstBowl()).toBeNull();
    });
    it('returns the score of the firstBowl', function() {
      frame.bowl(8);
      expect(frame.firstBowl()).toEqual(8);
    });
  });
});
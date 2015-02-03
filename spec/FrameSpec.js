describe('Frame', function() {
  beforeEach(function() {
    frame = new Frame();
  });

  describe('firstBowl', function() {
    it('returns the frame', function() {
      expect(frame.firstBowl(8)).toEqual(frame);
    });

    describe('over 10', function() {
      it('throws an error', function() {
        expect(function() {frame.firstBowl(11)}).toThrow();
      });
    });
  });

  it('can receive a second bowl and return the frame', function() {
    expect(frame.secondBowl(2)).toEqual(frame);
  });

  describe('bowl 1', function() {
    it('returns null', function() {
      expect(frame.bowl(1)).toBeNull();
    });
    describe('when there is a first bowl', function() {
      beforeEach(function() {
        frame.firstBowl(7);
      });
      it('returns the first bowl', function() {
        expect(frame.bowl(1)).toEqual(7);
      });
    });
  });

  describe('bowl 2', function() {
    it('returns null', function() {
      expect(frame.bowl(2)).toBeNull();
    });
    describe('when there is a second bowl', function() {
      beforeEach(function() {
        frame.secondBowl(7);
      });
      it('returns the second bowl', function() {
        expect(frame.bowl(2)).toEqual(7);
      });
    });
  });

});
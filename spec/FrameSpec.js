describe('Frame', function() {
  beforeEach(function() {
    frame = new Frame();
  });

  it('can receive a first bowl and return the frame', function() {
    expect(frame.firstBowl(8)).toEqual(frame);
  });

  it('can receive a second bowl and return the frame', function() {
    expect(frame.secondBowl(2)).toEqual(frame);
  });

  describe('bowl', function() {
    describe('when there is a first bowl', function() {
      beforeEach(function() {
        frame.firstBowl(7);
      });
      it('returns the first bowl', function() {
        expect(frame.bowl(1)).toEqual(7);
      });
    });
  });

});
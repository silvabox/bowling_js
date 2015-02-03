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

    describe('is under 0', function() {
      it('throws an error', function() {
        expect(function() {frame.bowl(-1)}).toThrow();
      });
    });

    describe('is over 10', function() {
      it('throws an error', function() {
        expect(function() {frame.bowl(11)}).toThrow();
      });
    });

    describe('is a strike', function() {
      beforeEach(function() {
        frame.bowl(10);
      });

      describe('isAStrike', function() {
        it('returns true', function() {
          expect(frame.isAStrike()).toBeTruthy();
        });
      });
      
      it('prevents further bowls', function() {
        expect(frame.canBowl()).toBeFalsy();
      });
    });

    describe('is not a strike', function() {
      beforeEach(function() {
        frame.bowl(9);
      });

      describe('isAStrike', function() {
        it('returns false', function() {
          expect(frame.isAStrike()).toBeFalsy();
        });
      });
      
      it('allows further bowls', function() {
        expect(frame.canBowl()).toBeTruthy();
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

  describe('second bowl', function() {
    beforeEach(function() {
      frame.bowl(6);
    });

    it('returns the frame', function() {
      expect(frame.bowl(3)).toEqual(frame);
    });

    describe('is under 0', function() {
      it('throws an error', function() {
        expect(function() {frame.bowl(-1)}).toThrow();
      });
    });

    describe('take score over 10', function() {
      it('throws an error', function() {
        expect(function() {frame.bowl(5)}).toThrow();
      });
    });
  });

  describe('second bowl after a strike', function() {
    beforeEach(function() {
      frame.bowl(10);
    });

    it('thows an error', function() {
      expect(function() {frame.roll(1)}).toThrow();
    });
  });

  describe('secondBowl', function() {
    it('returns null at first', function(){
      expect(frame.secondBowl()).toBeNull();
    });
    it('returns the score of the secondBowl', function() {
      frame.bowl(0).bowl(7);
      expect(frame.secondBowl()).toEqual(7);
    });
  });
});
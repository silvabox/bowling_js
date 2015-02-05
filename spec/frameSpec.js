describe('Frame', function() {
  beforeEach(function() {
    frame = new Frame();
  });

  describe('isFinal', function(){
    it('returns false', function(){
      expect(frame.isFinal()).toBeFalsy();
    });
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

      describe('isASpare', function() {
        it('returns false', function() {
          expect(frame.isASpare()).toBeFalsy();
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
    it('returns the score of the first bowl', function() {
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

    describe('takes score over 10', function() {
      it('throws an error', function() {
        expect(function() {frame.bowl(5)}).toThrow();
      });
    });

    it('prevents further bowls', function() {
      frame.bowl(3);
      expect(frame.canBowl()).toBeFalsy();
    });

    describe('is a spare', function() {
      beforeEach(function() {
          frame.bowl(4);
      });

      describe('isASpare', function() {
        it('returns true', function() {
          expect(frame.isASpare()).toBeTruthy();
        });
      });

      describe('isAStrike', function() {
        it('returns false', function() {
          expect(frame.isAStrike()).toBeFalsy();
        });
      });
    });

    describe('is not a spare', function() {
      describe('isASpare', function() {
        it('returns false', function() {
          frame.bowl(3);
          expect(frame.isASpare()).toBeFalsy();
        });
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
    it('returns the score of the second bowl', function() {
      frame.bowl(0).bowl(7);
      expect(frame.secondBowl()).toEqual(7);
    });

    describe('for a strike', function() {
      beforeEach(function(){
        frame.bowl(10);
      });

      it('returns null', function(){
        expect(frame.secondBowl()).toBeNull();
      });

      describe('with a next frame', function(){
        it('returns the first bowl of the next frame', function(){
          nextFrame = new Frame();
          frame.setNextFrame(nextFrame);
          nextFrame.bowl(7);
          expect(frame.secondBowl()).toEqual(7);
        });
      });
    });
  });

  describe('nextFrame', function() {
    it('returns null', function() {
      expect(frame.nextFrame()).toBeNull();
    })
  });

  describe('setNextFrame', function(){
    it('returns the next frame', function() {
      newFrame = new Frame();
      expect(frame.setNextFrame(newFrame)).toEqual(newFrame);
    });

    it('sets the next frame', function() {
      newFrame = new Frame();
      frame.setNextFrame(newFrame);
      expect(frame.nextFrame()).toEqual(newFrame);
    });
  });

  describe('score', function() {
    describe('for a normal frame', function() {
      it('returns the sum of the two bowls', function() {
        frame.bowl(2).bowl(7);
        expect(frame.score()).toEqual(9);
      });
    });

    describe('for a spare', function() {
      beforeEach(function(){
        frame.bowl(5).bowl(5);
      });

      it('returns 10', function() {
        expect(frame.score()).toEqual(10);
      });

      describe('with a next frame', function() {
        it('returns 10 + the first bowl of the next frame', function(){
          nextFrame = new Frame();
          nextFrame.bowl(3);
          frame.setNextFrame(nextFrame);
          expect(frame.score()).toEqual(13);
        });
      });
    });

    describe('for a strike', function() {
      beforeEach(function(){
        frame.bowl(10);
      });

      it('returns 10', function(){
        expect(frame.score()).toEqual(10);
      });

      describe('with a next frame', function() {
        beforeEach(function(){
          nextFrame = new Frame();
          frame.setNextFrame(nextFrame);
        });
        it('returns the 10 + the two bowls of the next frame', function(){
          nextFrame.bowl(3).bowl(5);
          expect(frame.score()).toEqual(18);
        });

        describe('that is a spare', function(){
          it('returns 20', function() {
            nextFrame.bowl(5).bowl(5);
            expect(frame.score()).toEqual(20);
          });
        });

        describe('that is a strike', function(){
          beforeEach(function(){
            nextFrame.bowl(10);
          });

          it('returns 20', function() {
            expect(frame.score()).toEqual(20);
          });

          describe('with a next frame', function(){
            beforeEach(function(){
              nextNextFrame = new Frame();
              nextFrame.setNextFrame(nextNextFrame);
            });

            it('returns 10 + 10 + the first bowl of the next next frame', function(){
              nextNextFrame.bowl(6);
              expect(frame.score()).toEqual(26);
            });
          });
        });
      });
    });
  });
});
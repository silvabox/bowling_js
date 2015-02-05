describe('FinalFrame', function() {
  beforeEach(function() {
    frame = new FinalFrame();
  });

  describe('isFinal', function(){
    it('returns true', function(){
      expect(frame.isFinal()).toBeTruthy();
    });
  });

  it('can bowl', function() {
    expect(frame.canBowl()).toBeTruthy();
  });

  describe('when strike is scored', function() {
    beforeEach(function(){
      frame.bowl(10);
    });
    it('allows 2 extra bowls', function(){
      expect(frame.canBowl()).toBeTruthy();
      expect(frame.bowl(4).canBowl()).toBeTruthy();
      expect(frame.bowl(5).canBowl()).toBeFalsy();
    });
    it('allows 2 more strikes', function(){
      expect(frame.canBowl()).toBeTruthy();
      expect(frame.bowl(10).canBowl()).toBeTruthy();
      expect(frame.bowl(10).canBowl()).toBeFalsy();
    });
  });

  describe('when spare is scored', function() {
    it('allows one further bowl', function() {
      expect(frame.bowl(5).bowl(5).canBowl()).toBeTruthy();
      expect(frame.bowl(3).canBowl()).toBeFalsy();
    });
  });

  describe('secondBowl', function(){
    describe('for a strike', function() {
      beforeEach(function(){
        frame.bowl(10);
      });

      it('returns null', function(){
        expect(frame.secondBowl()).toBeNull();
      });

      describe('with a second bowl', function(){
        it('returns the second bowl', function(){
          frame.bowl(6);
          expect(frame.secondBowl()).toEqual(6);
        });
      });
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

      describe('with a final bowl', function() {
        it('returns the 10 + the final bowl', function(){
          frame.bowl(3);
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

      describe('with a secondBowl', function() {
        it('returns the 10 + the next bowl', function(){
          frame.bowl(4);
          expect(frame.score()).toEqual(14);
        });

        describe('and a third bowl', function(){
          it('returns 10 + the second and third bowl', function() {
            frame.bowl(4).bowl(5);
            expect(frame.score()).toEqual(19);
          });
        });

        describe('that is a strike', function(){
          beforeEach(function(){
            frame.bowl(10);
          });

          it('returns 20', function() {
            expect(frame.score()).toEqual(20);
          });

          describe('with a third bowl', function(){
            it('returns 10 + 10 + the third bowl', function(){
              frame.bowl(6);
              expect(frame.score()).toEqual(26);
            });
          });

          describe('with a third strike', function(){
            it('returns 30', function(){
              frame.bowl(10);
              expect(frame.score()).toEqual(30);
            });
          });
        });
      });
    });
  });
});
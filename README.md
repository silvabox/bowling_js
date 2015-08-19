[![Coverage Status](https://coveralls.io/repos/silvabox/bowling_js/badge.svg)](https://coveralls.io/r/silvabox/bowling_js)

# bowling_js
Makers Academy bowling scorecard solution with Jasmine

## A note on the tests
I've tried to give an example of using tests to fully specify the solution.

Run SpecRunner.html and read the output to see the extent of the solution.  I don't warrant that every eventuality is covered, but the obvious paths are.

## A note on the solution
The solution uses a linked-list-style approach, with each frame having a reference to the next frame, which it uses to calculate its own score (in the case of a strike or spare).

The game can then walk this list (starting at the first frame) to calculate the total score.

Note how `bowl()` methods return `this` to allow chaining.  This is provided merely as a convenience, but makes for a nice interface.

## A note on FinalFrame
`FinalFrame` uses a 'classical' inheritance pattern - i.e. it's aim is to construct objects whose prototype inherits the prototype of `Frame` and whose constructor also calls the `Frame` constructor.

This is achieved by overwriting the `FinalFrame` function's prototype with a new object derived from the `Frame` prototype:
```
FinalFrame.prototype = Object.create(Frame.prototype);
```
However, this means `FinalFrame`'s prototype now inherits its `constructor` property from `Frame`'s prototype; this returns `Frame`, which we don't want, so we overwrite the property:
```
FinalFrame.prototype.constructor = FinalFrame;
```

Finally, we call the `Frame` constructor from `FinalFrame` to correctly initialize the new object:
```
function FinalFrame() {
  Frame.call(this);
};
```

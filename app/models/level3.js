import Level from './level';

export default Level.extend({
  startingPac: {
    x: 1,
    y: 3
  },
  startingGhosts: [{
    x: 0,
    y: 0,
  },{
    x: 5,
    y: 0
  }],
  squareSize: 60,
  layout: [
    [1, 1, 1, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 1, 1],
    [1, 2, 2, 2, 3, 2, 2, 2, 1],
    [1, 2, 2, 1, 1, 2, 2, 2, 1],
    [1, 2, 2, 2 ,2, 2, 1, 2, 1],
    [1, 2, 1, 2, 1, 2, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 2, 1, 1, 1, 1, 1],
  ]
});

import Level from './level';

export default Level.extend({
  startingPac: {
    x: 1,
    y: 1
  },
  startingGhosts: [{
    x: 3,
    y: 6,
  },{
    x: 2,
    y: 2
  }],
  teleport: true,
  squareSize: 60,
  layout: [
    [1, 1, 1, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 1, 1],
    [1, 2, 2, 2, 3, 2, 2, 2, 1],
    [1, 2, 2, 1, 1, 1, 2, 2, 1],
    [1, 2, 2, 2 ,2, 2, 2, 2, 1],
    [1, 2, 1, 2, 1, 2, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 2, 1, 1, 1, 1, 1],
  ],
  ghostRetreat: {
    x: 4,
    y: 3
  }
});

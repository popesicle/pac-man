import Ember from 'ember';

export default Ember.Object.extend({
  startingPac: {
    x: 2,
    y: 1
  },
  // 0 is a blank space
  // 1 is a wall
  // 2 is a pellet
  grid: [
    [2, 2, 2, 2, 2, 2, 2, 1],
    [2, 1, 2, 1, 2, 2, 2, 1],
    [2, 2, 1, 2, 2, 2, 2, 1],
    [2, 2, 2, 2, 2, 2, 2, 1],
    [2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
  ],

  squareSize: 40,
  width: Ember.computed(function(){
    return this.get('grid.firstObject.length');
  }),
  height: Ember.computed(function(){
    return this.get('grid.length');
  }),
  pixelWidth: Ember.computed(function(){
    return this.get('width') * this.get('squareSize');
  }),
  pixelHeight: Ember.computed(function(){
    return this.get('height') * this.get('squareSize');
  }),

  // Cycles through the 'grid', checks for any twos, if there are no twos
  // it returns false, completing a level.
  isComplete(){
    let hasPelletsLeft = false;
    let grid = this.get('grid');

    grid.forEach((row)=> {
      row.forEach((cell)=> {
        if(cell == 2){
          hasPelletsLeft = true;
        }
      })
    })
    return !hasPelletsLeft;
  },

  // Cycles through the grid, and places a 2 at every instance of a 0
  restart(){
    let grid = this.get('grid');
    grid.forEach((row, rowIndex)=> {
      row.forEach((cell, columnIndex)=> {
        if(cell == 0){
          grid[rowIndex][columnIndex] = 2;
        }
      });
    });
  },
});

import Ember from 'ember';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';
import SharedStuff from '../mixins/shared-stuff';
import Pac from '../models/pac';
import Ghost from '../models/ghost';
import Level2 from '../models/level2';
import Movement from '../mixins/movement';

export default Ember.Component.extend(KeyboardShortcuts, SharedStuff, Movement, {
  didInsertElement() {
    let level = Level2.create();
    this.set('level', level);
    let pac = Pac.create({
      level: level,
      x: level.get('startingPac.x'),
      y: level.get('startingPac.y')
    });
    let ghosts = level.get('startingGhosts').map((startingPosition)=> {
      return Ghost.create({
        level: level,
        x: startingPosition.x,
        y: startingPosition.y,
        pac: pac,
      })
    });
    this.set('pac', pac);
    this.set('ghosts', ghosts);
    this.loop();
  },

  score: 0,
  lives: 3,
  levelNumber: 1,

  screenWidth: Ember.computed(function() {
    return this.get('level.grid.firstObject.length');
  }),
  screenHeight: Ember.computed(function() {
    return this.get('level.grid.length');
  }),

  drawWall(x, y) {
    let ctx = this.get('ctx');
    let squareSize = this.get('level.squareSize');

    ctx.fillStyle = '#000';
    ctx.fillRect(x * squareSize,
                 y * squareSize,
                 squareSize,
                 squareSize);
  },

  drawGrid() {
    let grid = this.get('level.grid');

    grid.forEach((row, rowIndex)=> {
      row.forEach((cell, columnIndex)=> {
        if(cell === 1){
          this.drawWall(columnIndex, rowIndex);
        }
        if(cell === 2){
          this.drawPellet(columnIndex, rowIndex);
        }
      });
    });
  },

  drawPellet(x, y){
    let radiusDivisor = 6;
    this.drawCircle(x, y, radiusDivisor, 'stopped');
  },

  clearScreen() {
    let ctx = this.get('ctx');

    ctx.clearRect(0, 0, this.get('level.pixelWidth'), this.get('level.pixelHeight'));
  },

  loop(){
    this.get('pac').move();
    this.get('ghosts').forEach( ghost => ghost.move() );

    this.processAnyPellets();

    this.clearScreen();
    this.drawGrid();
    this.get('pac').draw();
    this.get('ghosts').forEach( ghost => ghost.draw() );

    if(this.collidedWithGhost()){
      this.decrementProperty('lives');
      this.restart();
    }

    Ember.run.later(this, this.loop, 1000/60);
  },

  collidedWithGhost(){
    return this.get('ghosts').any((ghost)=>{
      return this.get('pac.x') == ghost.get('x') && this.get('pac.y') == ghost.get('y')
    })
  },

  processAnyPellets(){
    let x = this.get('pac.x');
    let y = this.get('pac.y');
    let grid = this.get('level.grid');

    if(grid[y][x] == 2){
      grid[y][x] = 0;
      this.incrementProperty('score');

      if(this.get('level').isComplete()){
        this.incrementProperty('levelNumber');
        this.get('level').restart();
        this.restart();
      }
    }
  },

  restart(){
    if(this.get('lives') <= 0){
      this.set('score', 0)
      this.set('lives', 3)
      this.get('level').restart();
    }
    this.get('pac').restart();
    this.get('ghosts').forEach( ghost => ghost.restart() );
  },

  // restartLevel(){
  //   this.set('pac.x', 0);
  //   this.set('pac.y', 0);
  //   this.set('pac.frameCycle', 0);
  //   this.set('pac.direction', 'stopped');
  //
  //   let grid = this.get('level.grid');
  //   grid.forEach((row, rowIndex)=> {
  //     row.forEach((cell, columnIndex)=>{
  //       if(cell == 0){
  //         grid[rowIndex][columnIndex] = 2;
  //       }
  //     })
  //   })
  // },

  keyboardShortcuts: {
    up() { this.set('pac.intent', 'up');},
    down() { this.set('pac.intent', 'down');},
    left() { this.set('pac.intent', 'left');},
    right() { this.set('pac.intent', 'right');},
  },
});

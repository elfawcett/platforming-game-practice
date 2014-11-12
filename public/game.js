var game = new Phaser.Game( 320, 240, Phaser.AUTO, '');

var startGame = function() {
  game.state.start('play');
};

var restartGame = function() {
  // Load the default state
  game.state.start('mainMenu');

  // Return false to break update loops
  return false;
};

var loadLevel = function( level ) {
  if ( typeof level === 'undefined') {
    level = 'play';
  }
  if ( game.state.checkState( level )) {
    game.state.start( level );
    return false;
  }
  return true;
};

var gameOver = function() {
  game.state.start('gameOver');
};

// Add states to game
game.state.add('play', state_play );
game.state.add('mainMenu', state_mainMenu );
game.state.add('gameOver', state_gameOver );

// Start the game
game.state.start('mainMenu');
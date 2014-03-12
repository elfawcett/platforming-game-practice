var game = new Phaser.Game( 480, 240, Phaser.AUTO, '');


var restartGame = function() {
  // Load the default state
  game.state.start('play');

  // Return false to break update loops
  return false;
};

// Add states to game
game.state.add('play', state_play );
game.state.add('mainMenu', state_mainMenu )

// Start the game
game.state.start('play');
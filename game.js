var game = new Phaser.Game( 480, 240, Phaser.AUTO, '');




// Add states to game
game.state.add('play', state_play );
game.state.add('mainMenu', state_mainMenu )

// Start the game
game.state.start('play');
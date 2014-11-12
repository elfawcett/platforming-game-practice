/*=======================================
=            Game Over state            =
=======================================*/

var state_gameOver = {
  preload: function() {

  }

, create: function() {
    // Resize the game world to be appropriate for this state
    this.game.world.setBounds( 0, 0, this.game.width, this.game.height );

    // Main menu text
    this.label_title     = this.game.add.text( 20, 20, 'Game Over');
    this.label_startText = this.game.add.text( 20, 40, 'Press Space to play again');

    // Start on space
    this.key_startGame = this.game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR );
    this.key_startGame.onDown.add( startGame );
  }
};
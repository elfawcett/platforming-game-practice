/*============================================
=            Main Menu game state            =
============================================*/
var state_mainMenu = {
  preload: function() {
    this.game.stage.backgroundColor = '#d3d3d3';
  }

, create: function() {
    // Resize the game world to be appropriate for this state
    this.game.world.setBounds( 0, 0, this.game.width, this.game.height );

    // Main menu text
    this.label_title     = this.game.add.text( 20, 20, 'Platformer');
    this.label_startText = this.game.add.text( 20, 40, 'Press Space to start');

    // Start on space
    this.key_startGame = this.game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR );
    this.key_startGame.onDown.add( startGame );
  }

, update: function() {
  }

, render: function() {

  }
};
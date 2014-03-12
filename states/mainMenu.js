/*============================================
=            Main Menu game state            =
============================================*/
var state_mainMenu = {
  preload: function() {
    this.game.stage.backgroundColor = '#d3d3d3';
  }

, create: function() {
    // Main menu text
    this.label_title = this.game.add.text( 20, 20, 'Platformer');

    this.label_startText = this.game.add.text( 20, 40, 'Press Space to start');
  }

, update: function() {
    // Start the game on space key
    this.game.add
  }

, render: function() {

  }
};
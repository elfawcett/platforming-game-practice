/*==========  Game-global vars & config state  ==========*/
var cursors;
var jumpButton;
var wasdCursors;
var wasdJump;

var state_globalConfig = {

  create: function() {
    // Setup game input
    cursors    = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey( Phaser.Keyboard.NUMPAD_0 );

    wasdCursors = {
      up    : game.input.keyboard.addKey( Phaser.Keyboard.W )
    , down  : game.input.keyboard.addKey( Phaser.Keyboard.S )
    , left  : game.input.keyboard.addKey( Phaser.Keyboard.A )
    , right : game.input.keyboard.addKey( Phaser.Keyboard.D )
    };
    wasdJump = game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR );

    runnerModeToggle = game.input.keyboard.addKey( Phaser.Keyboard.F3 );


  }
};

// Init this config immediately
game.state.add('globalConfig', state_globalConfig );
game.state.start('globalConfig');
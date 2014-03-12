/*==================================
=            Play State            =
==================================*/

var player;
var playerTwo;

var map;
var level1;
var level2;

var cursors;
var jumpButton;
var wasdCursors;
var wasdJump;

var state_play = {
  preload: function() {

    // Game assets
    this.game.load.tilemap('level1'    , 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON );
    this.game.load.image(  'ground' , 'assets/tilesets/ground.png');

    // Player
    var playerOneOptions = {
      maxVelocity : 1000
    , accelRate   : 250
    };
    player = new Player( game, playerOneOptions );
    player.preload();

    // Player two
    // playerTwo = new Player( game );
    // playerTwo.preload();

  }

, create: function() {
    this.game.stage.backgroundColor = '#00ccee';
    this.game.physics.gravity.y = 500;

    // Setup tilemaps
    map = this.game.add.tilemap('level1');
    map.addTilesetImage('ground');
    map.setCollisionByExclusion([]);

    // Setup layers
    layer = map.createLayer('level1');
    layer.resizeWorld();
    // layer.debug = true;

    // Readjust game physics
    this.game.physics.setBoundsToWorld();

    // Create players
    player.create();
    // playerTwo.create();

    // Setup game input
    cursors    = this.game.input.keyboard.createCursorKeys();
    jumpButton = this.game.input.keyboard.addKey( Phaser.Keyboard.NUMPAD_0 );

    wasdCursors = {
      up    : this.game.input.keyboard.addKey( Phaser.Keyboard.W )
    , down  : this.game.input.keyboard.addKey( Phaser.Keyboard.S )
    , left  : this.game.input.keyboard.addKey( Phaser.Keyboard.A )
    , right : this.game.input.keyboard.addKey( Phaser.Keyboard.D )
    };
    wasdJump = this.game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR );

    runnerModeToggle = this.game.input.keyboard.addKey( Phaser.Keyboard.F3 );

    // Set initial camera follow
    this.game.camera.follow( player.sprite );

  }

, update: function() {
    // Collisions
    this.game.physics.collide( player.sprite, layer );
    // this.game.physics.collide( playerTwo.sprite, layer );

    // Check for player death
    if ( !player.sprite.inWorld ) {
      return this.restartGame(); // Return false to break the update loop
    }

    player.update({ cursors: wasdCursors, jump: wasdJump, runnerModeToggle: runnerModeToggle });
  }

, render: function() {
    player.render();
    // playerTwo.render();
  }

  /*==========  User Functions  ==========*/
, restartGame: function() {
    // Do everything necessary to restart the game, reset score, positioning, etc.
    // player.sprite.kill();

    // player.create();

    this.game.state.start('play');
    // Return false to the function calling restartGame() --usually update()
    return false;
  }

};
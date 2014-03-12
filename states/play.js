/*==================================
=            Play State            =
==================================*/

/**

  TODO:
  - Should probably move all of these vars into state_play
    properties of state_play

    preload: function() {
      this.player = new Player()
    }

    create: function() {
      this.map = this.game.add.tilemap()
    }

**/
    
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
    this.game.stage.backgroundColor = '#00ccee';

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
      gameOver(); // Return false to break the update loop
    }

    player.update({ cursors: wasdCursors, jump: wasdJump, runnerModeToggle: runnerModeToggle });
  }

, render: function() {
    player.render();
    // playerTwo.render();
  }

};
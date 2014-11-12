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
var playerGroup;

var staticPlatforms;

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
    this.game.load.tilemap('level1' , 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON );
    this.game.load.image(  'ground' , 'assets/tilesets/ground.png');

    // Player
    var playerOneOptions = {
    //   maxVelocity : 1000
    // , accelRate   : 250
    };
    player = new Player( game, playerOneOptions );
    player.preload();

  }

, create: function() {
    // Setup tilemaps
    map = this.game.add.tilemap('level1');
    map.addTilesetImage('ground');
    map.setCollisionByExclusion([ 12 ]);

    // Setup layers
    layer = map.createLayer('level1');
    layer.resizeWorld();
    // layer.debug = true;

    // Move

    // Create some groups
    // staticPlatforms = this.game.add.group();
    // var ground = staticPlatforms.create( 100, this.game.world.height - 16, 'ground')
    // ground.scale.setTo( 30, 1 );
    // ground.body.immovable = true;

    // Readjust game physics
    this.game.physics.setBoundsToWorld();

    // Create players
    player.create({ x: 64, y: map.heightInPixels - 64 });

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
    // this.game.physics.collide( player.sprite, staticPlatforms );//, player.idle( true ));

    // Check for player death
    if ( !player.sprite.inWorld ) {
      gameOver();
    }

    player.update({ cursors: wasdCursors, jump: wasdJump, runnerModeToggle: runnerModeToggle });
  }

, render: function() {
    player.render();
  }

};
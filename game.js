/*==================================
=            Platformer            =
==================================*/

var game = new Phaser.Game( 640, 480, Phaser.AUTO, '', {
  preload : preload
, create  : create
, update  : update
, render  : render
});

/*==========  Game Variables  ==========*/
var
  // Backgrounds
  defaultBG

  // Tilemaps
, map

  // Layers
, layer

  // Sprites
, player
, platforms

  // Text

  // Inputs
, cursors
;



/*===============================
=            preload            =
===============================*/
function preload() {
  /*==========  Backgrounds  ==========*/
  game.load.image('defaultBG', 'assets/defaultBG.png');

  /*==========  Platforms  ==========*/
  // game.load.image('defaultPlatform', 'assets/defaultPlatform.png');
  // Tilemaps
  game.load.tilemap('level1'      , 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON );
  game.load.image('ground' , 'assets/tilemaps/ground.png')

  // Player
  player = new Player( game );
  player.preload();
  
}

/*==============================
=            create            =
==============================*/
function create() {
  /*==========  Base game options  ==========*/
  game.stage.backgroundColor = '#00ccee';
  game.physics.gravity.y = 250;
  game.physics.setBoundsToWorld();


  /*==========  Background  ==========*/
  // defaultBG = game.add.tileSprite( 0, 0, 640, 480, 'defaultBG');
  // defaultBG.fixedToCamera = true;

  // Tilemap
  map = game.add.tilemap('level1'); // this wants the name of the tilemap cached in preload
  map.addTilesetImage('ground'); // this wants the name of the image used for the tilemap, the tileset.image.name in Tiled's generated JSON, and it must also be the name used to cache the image in preload
  map.setCollisionByExclusion([]);

  layer = map.createLayer('level1'); // this must match the name of the layer used in Tiled
  layer.resizeWorld();

  layer.debug = true;

  // Player
  player.create();

  // Input
  cursors = game.input.keyboard.createCursorKeys();
  btn_jump = game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR );
}

/*==============================
=            update            =
==============================*/
function update() {
  // game.physics.collide( player, layer );

  player.update();
  

}

/*==============================
=            render            =
==============================*/
function render() {

}

/*======================================================
=            Classes - move these out later            =
======================================================*/

/*==========  Player  ==========*/
var Player = function( game ) {
  // Set some conveniences
  this.game   = game;
  this.sprite = null;
  // may need to pass in cursors for input if using input on things other than player which would add something like this.cursors = cursors
};

Player.prototype = {
  preload : function() {
    this.game.load.spritesheet('player', 'assets/player/player_32x32.png', 32, 32 ); // Change this to 'spritesheet.png' eventually, containing all 32x32 sprites for player
  }

, create  : function() {
    this.sprite = game.add.sprite( 32, 32, 'player');

    // Set physics of player
    this.sprite.body.minVelocity.y = 5;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.setRectangle( 16, 32, 8, 16 );

    // Set animations of player

  }

, update  : function() {
    // Stop motion on every frame
    this.sprite.body.velocity.x = 0;

    // Handle user input
    if ( cursors.left.isDown ) {
      this.sprite.body.velocity.x = -150;
    }
    else if ( cursors.right.isDown ) {
      this.sprite.body.velocity.x = 150;
    }

    if ( btn_jump.isDown && this.sprite.body.onFloor() ) {
      this.sprite.body.velocity.y = -250;
    }
  }
, render  : function() {}
};

/*==========  Level  ==========*/
var Level = function( game ) {
  this.game = game;
};

Level.prototype = {
  preload : function() {}
, create  : function() {}
, update  : function() {}
, render  : function() {}
};




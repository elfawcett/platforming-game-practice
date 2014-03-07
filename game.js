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
  game.load.tilemap('level'      , 'assets/tilemaps/test.json', null, Phaser.Tilemap.TILED_JSON );
  game.load.image('tilemap-test' , 'assets/tilemaps/test.png')

  // Player
  player = new Player( game );
  player.preload();
  
}

/*==============================
=            create            =
==============================*/
function create() {
  /*==========  Base game options  ==========*/
  game.stage.backgroundColor = '#c3c3c3';
  game.physics.gravity.y = 250;
  game.physics.setBoundsToWorld();


  /*==========  Background  ==========*/
  // defaultBG = game.add.tileSprite( 0, 0, 640, 480, 'defaultBG');
  // defaultBG.fixedToCamera = true;

  // Tilemap
  map = game.add.tilemap('level');
  map.addTilesetImage('tilemap-test');
  map.setCollisionByExclusion([]);

  layer = map.createLayer('Tile Layer 1');
  layer.resizeWorld();

  /*==========  Initial platforms and ground  ==========*/
  // platforms = game.add.group();

  // var ground = platforms.create( 0, game.world.height - 16, 'defaultPlatform');
  // ground.body.immovable = true;
  // ground.fixedToCamera = true;
  // var ground = game.add.tileSprite( 0, ( game.world.height - 16 ), 640, 16, 'defaultPlatform');

  for ( var i = 0; i < 12; i++ ) {

  }

  // Player
  player.create();
}

/*==============================
=            update            =
==============================*/
function update() {
  /*==========  Background  ==========*/
  // defaultBG.tilePosition.y += 0.5;
  game.physics.collide( player, layer );
  

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
    // this.sprite.body.

    // Set animations of player
  }

, update  : function() {
    // Stop motion on every frame
    // this.sprite.body.velocity.x = 0;

    // Handle user input
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




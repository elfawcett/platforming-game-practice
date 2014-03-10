var game = new Phaser.Game( 320, 240, Phaser.AUTO, '', {
  preload : preload
, create  : create
, update  : update
, render  : render
});

// Game vars
var
  player     // player/Player.js
, playerTwo

, map
, level1
, level2

, cursors
, jumpButton
, wasdCursors
, wasdJump
;

function preload() {

  // Game assets
  game.load.tilemap('level1'    , 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON );
  game.load.image(  'ground' , 'assets/tilesets/ground.png');

  // Player
  var playerOneOptions = {
    maxVelocity : 1000
  , accelRate   : 250
  };
  player = new Player( game, playerOneOptions );
  player.preload();

  // Player two
  playerTwo = new Player( game );
  playerTwo.preload();

}

function create() {
  game.stage.backgroundColor = '#00ccee';
  game.physics.gravity.y = 1500;
  

  // Create players
  player.create({ x: 16, y: 0 });
  playerTwo.create({ x: 32, y: 0 });

  // Setup tilemaps
  map = game.add.tilemap('level1');
  map.addTilesetImage('ground');
  map.setCollisionByExclusion([]);

  // Setup layers
  layer = map.createLayer('level1');
  layer.resizeWorld();
  layer.debug = true;

  // Readjust game physics
  game.physics.setBoundsToWorld();


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

  // Set initial camera follow
  game.camera.follow( player.sprite );

}

function update() {
  // Collisions
  game.physics.collide( player.sprite, layer );
  game.physics.collide( playerTwo.sprite, layer );

  // Update camera follow
  if ( player.sprite.x > playerTwo.sprite.x ) {
    game.camera.follow( player.sprite );
  }
  else if ( playerTwo.sprite.x > player.sprite.x ) {
    game.camera.follow( playerTwo.sprite );
  }
  player.update({ cursors: wasdCursors, jump: wasdJump });
  playerTwo.update({ cursors: cursors, jump: jumpButton });
}

function render() {
  player.render();
  playerTwo.render();
}
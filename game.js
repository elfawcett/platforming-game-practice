var game = new Phaser.Game( 480, 240, Phaser.AUTO, '', {
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
  // playerTwo = new Player( game );
  // playerTwo.preload();

}

function create() {
  game.stage.backgroundColor = '#00ccee';
  game.physics.gravity.y = 500;

  // Setup tilemaps
  map = game.add.tilemap('level1');
  map.addTilesetImage('ground');
  map.setCollisionByExclusion([]);

  // Setup layers
  layer = map.createLayer('level1');
  layer.resizeWorld();
  // layer.debug = true;

  // Readjust game physics
  game.physics.setBoundsToWorld();

  // Create players
  player.create();
  // playerTwo.create();

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

  // Set initial camera follow
  game.camera.follow( player.sprite );

}

function update() {
  // Collisions
  game.physics.collide( player.sprite, layer );
  // game.physics.collide( playerTwo.sprite, layer );

  layer.scrollX++;

  player.update({ cursors: wasdCursors, jump: wasdJump, runnerModeToggle: runnerModeToggle });
}

function render() {
  player.render();
  // playerTwo.render();
}
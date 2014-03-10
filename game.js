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
  game.load.tilemap('tilemap'    , 'assets/tilemaps/tilemap.json', null, Phaser.Tilemap.TILED_JSON );
  game.load.image(  'ground' , 'assets/tilemaps/ground.png');

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
  player.create();
  playerTwo.create({ x: 32, y: game.world.height - 48 });

  // Setup tilemaps
  map = game.add.tilemap('tilemap');
  map.addTilesetImage('ground');
  map.setCollisionByExclusion([]);

  // Setup layers
  // level1 = map.createLayer('level1');
  // level1.resizeWorld();
  // level1.debug = true;

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
  // game.camera.follow( player );
}

function update() {
  // Collisions
  game.physics.collide( player, level1 );
  game.physics.collide( playerTwo, level1 );

  // Update camera follow
  // if ( player.x > playerTwo.x ) {
  //   game.camera.follow( player );
  // }
  // else if ( playerTwo.x > player.x ) {
  //   game.camera.follow( playerTwo );
  // }
  player.update({ cursors: wasdCursors, jump: wasdJump });
  playerTwo.update({ cursors: cursors, jump: jumpButton });
}

function render() {
  player.render();
  playerTwo.render();
}
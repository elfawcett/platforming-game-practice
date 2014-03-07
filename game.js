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
  game.load.image('defaultPlatform', 'assets/defaultPlatform.png');
  
}

/*==============================
=            create            =
==============================*/
function create() {
  /*==========  Background  ==========*/
  defaultBG = game.add.tileSprite( 0, 0, 640, 480, 'defaultBG');

  /*==========  Initial platforms and ground  ==========*/
  platforms = game.add.group();

  var ground = platforms.create( 0, game.world.height - 64, 'defaultPlatform');

  for ( var i = 0; i < 12; i++ ) {

  }
}

/*==============================
=            update            =
==============================*/
function update() {
  /*==========  Background  ==========*/
  // defaultBG.tilePosition.y += 0.5;
  

}

/*==============================
=            render            =
==============================*/
function render() {

}
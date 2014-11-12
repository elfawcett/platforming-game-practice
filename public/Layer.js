/*==========  Layer  ==========*/
var Layer = function( game, map ) {
  this.game = game;
  this.map  = map;
};

Layer.prototype = {
  preload : function() {}

, create  : function( tilemap, tileset, collisionExclusions ) {
    this.map = this.game.add.tilemap('')
  }
, update  : function() {
  
  }

, render  : function() {
  
  }
};

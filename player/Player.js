/*==========  Player  ==========*/
var Player = function( game, options ) {
  this.game    = game;
  this.sprite  = null;

  // Default options
  this.maxVelocity = 150;
  this.accelRate   = 150;
  this.jumpHeight  = 75;
  this.jumpRate    = 100;
  this.hangPct     = 0.85;
  this.hangTime    = 5;
  this.jumpDecel   = 0.25;
  this.fallRate    = 0.25 ;

  // Custom options
  if ( typeof options !== 'undefined') {
    // apply options
    for ( var key in options ) {
      if ( key !== 'game' && key !== 'sprite') {
        this[key] = options[key];
      }
    }
  }
};

Player.prototype = {
  preload : function() {
    this.game.load.spritesheet('player', 'player/assets/player.png', 16, 32 );
  }

, create  : function( startPos ) {
    if ( typeof startPos === 'undefined') {
      startPos = {
        x: 16
      , y: game.world.height - 48
      };
    }

    this.sprite = this.game.add.sprite( startPos.x, startPos.y, 'player');

    // Physics
    this.sprite.body.collideWorldBounds = true;

    // Animations
    //                    .add( name, frames, framerate, loop )
    this.sprite.animations.add('idle', [ 0 ], 10, true );
    this.sprite.animations.add('left', [ 2 ], 10, true );
    this.sprite.animations.add('right', [ 1 ], 10, true );
  }
, update  : function( controls ) {
    // Reset X motion
    this.sprite.body.velocity.x = 0;

    // Prevent exceeding jumpHeight
    if ( this.isJumping ) {
      // Establish jump delta
      var jumpDelta = -( this.sprite.body.y - this.jumpStart );
      if ( jumpDelta > this.jumpHeight ) {
        // this.sprite.body.velocity.y = -this.sprite.body.velocity.y;
        console.log(this.sprite.body.velocity.y, this.sprite.body.velocity.y * this.fallRate )
        this.sprite.body.velocity.y =  -( this.sprite.body.velocity.y * this.fallRate );
        console.log(this.sprite.body.velocity.y)
        this.isJumping = false;
      }
    }

    // Left movements
    if ( controls.cursors.left.isDown ) {
      this.sprite.body.velocity.x = -this.accelRate;
      
      if ( this.facing != 'left') {
        this.sprite.animations.play('left');
        this.facing = 'left';
      }
    }

    // Right movement
    else if ( controls.cursors.right.isDown ) {
      this.sprite.body.velocity.x = this.accelRate;

      if ( this.facing != 'right') {
        this.sprite.animations.play('right');
        this.facing = 'right';
      }
    }

    // Idle
    else {
      if ( this.facing != 'idle') {
        this.sprite.animations.play('idle');
        this.facing = 'idle';
      }
    }

    // Jumping
    if ( controls.jump.isDown && this.sprite.body.onFloor() ) {
      this.jumpStart = this.sprite.body.y;
      this.isJumping = true;

      this.sprite.body.velocity.y = -this.jumpRate;
    }

  }

, render  : function() {
    if ( this.debug ) {
      game.debug.renderPhysicsBody( this.sprite.body );
    }
  }
};

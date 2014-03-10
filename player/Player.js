/*==========  Player  ==========*/
var Player = function( game, options ) {
  this.game    = game;
  this.sprite  = null;

  // Default options
  this.maxVelocity = 150;
  this.accelRate   = 150;
  this.jumpHeight  = 25;
  this.jumpRate    = 1500;

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
        x: 0
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
      if (-( this.sprite.body.y - this.jumpStart ) > this.jumpHeight ) {
        // this.sprite.body.velocity.y = -this.sprite.body.velocity.y;
        this.sprite.body.velocity.y = 0;
        this.isJumping = false;
      }
    }

    // Left movements
    if ( controls.cursors.left.isDown ) {
      // Increase velocity up to max at accelRate
      // this.sprite.body.acceleration.x -= this.accelRate;
      // if ( -this.sprite.body.acceleration.x > this.maxVelocity ) {
      //   this.sprite.body.acceleration.x = -this.maxVelocity;
      // }

      this.sprite.body.velocity.x = -this.accelRate;
      // Stop acceleration and play animation once
      if ( this.facing != 'left') {
        // this.sprite.body.acceleration.x += this.accelRate * 5;

        this.sprite.animations.play('left');
        this.facing = 'left';
      }
    }

    // Right movement
    else if ( controls.cursors.right.isDown ) {
      // this.sprite.body.acceleration.x += this.accelRate;
      // if ( this.sprite.body.acceleration.x > this.maxVelocity ) {
      //   this.sprite.body.acceleration.x = this.maxVelocity;
      // }
      
      this.sprite.body.velocity.x = this.accelRate;
      if ( this.facing != 'right') {
        // this.sprite.body.acceleration.x -= this.accelRate * 2;

        this.sprite.animations.play('right');
        this.facing = 'right';
      }
    }

    // Idle
    else {
      if ( this.facing != 'idle') {
        // if ( this.sprite.body.acceleration.x > 0 ) {
        //   this.sprite.body.acceleration.x -= 500;
        // } else {
        //   this.sprite.body.acceleration.x += this.accelRate * 2;
        // }

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

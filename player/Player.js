/*==========  Player  ==========*/
var Player = function( game, options ) {
  this.game    = game;
  this.sprite  = null;

  // Default options
  this.gravity     = 500;
  this.startPos    = { x: 0, y: 0 };
  this.maxVelocity = 150;
  this.accelRate   = 150;
  this.jumpHeight  = 75;
  this.jumpRate    = 500;
  this.hangPct     = 0.85;
  this.hangTime    = 5;
  this.jumpDecel   = 0.25;
  this.fallRate    = 0.25 ;
  this.runnerMode  = false;

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
  preload: function() {
    this.game.load.spritesheet('player', 'player/assets/player.png', 16, 32 );
  }

, create: function( startPos ) {
    // Starting position
    if ( typeof startPos === 'undefined') {
      startPos = this.startPos;
    }

    this.sprite = this.game.add.sprite( startPos.x, startPos.y, 'player');

    // Physics
    this.sprite.body.gravity.y = this.gravity;
    this.sprite.body.collideWorldBounds = false;

    // Animations
    //                    .add( name, frames, framerate, loop )
    this.sprite.animations.add('idle', [ 0 ], 10, true );
    this.sprite.animations.add('left', [ 2 ], 10, true );
    this.sprite.animations.add('right', [ 1 ], 10, true );
  }
, update: function( controls ) {
    // Reset X motion
    if ( this.runnerMode ) {
      this.sprite.body.velocity.x = 100;
    } else {
      this.sprite.body.velocity.x = 0;
    }

    // Prevent exceeding jumpHeight
    if ( this.isJumping ) {
      // Establish jump delta
      var jumpDelta = -( this.sprite.body.y - this.jumpStart );
      if ( jumpDelta > this.jumpHeight ) {
        // this.sprite.body.velocity.y = -this.sprite.body.velocity.y;
        this.sprite.body.velocity.y =  -( this.sprite.body.velocity.y * this.fallRate );
        this.isJumping = false;
      }
    }

    // Reset jump blocker when space is released
    if ( controls.jump.isUp ) this.blockJumping = false;


    // Left movement
    if ( controls.cursors.left.isDown ) {
      this.moveLeft();
    }

    // Right movement
    else if ( controls.cursors.right.isDown ) {
      this.moveRight();
    }

    // Idle
    else {
      this.idle();
    }

    // Jumping
    if ( !this.blockJumping && controls.jump.isDown && this.sprite.body.onFloor() ) {
      this.jump()
    }

    // Toggle endless runner mode
    controls.runnerModeToggle.onDown.add( function() {
      this.runnerMode = ( this.runnerMode  === true ) ? false : true;
    }, this );


  }

, render: function() {
    if ( this.debug ) {
      game.debug.renderPhysicsBody( this.sprite.body );
    }
  }

/*==========  Player actions  ==========*/
, idle: function() {
    this.sprite.body.velocity.x = 0;

    if ( this.facing != 'idle') {
      this.sprite.animations.play('idle');
      this.facing = 'idle';
    }
  }

, moveLeft: function() {
    this.sprite.body.velocity.x = -this.accelRate;

    if ( this.facing != 'left') {
      this.sprite.animations.play('left');
      this.facing = 'left';
    }
  }

, moveRight: function() {
    this.sprite.body.velocity.x = this.accelRate;

    if ( this.facing != 'right') {
      this.sprite.animations.play('right');
      this.facing = 'right';
    }
  }

, jump: function() {
    this.jumpStart    = this.sprite.body.y;
    this.isJumping    = true;
    this.blockJumping = true;

    this.sprite.body.velocity.y = -this.jumpRate;
  }

};
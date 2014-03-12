/*==========  Player  ==========*/
var Player = function( game, options ) {
  this.game    = game;
  this.sprite  = null;

  // Default options
  this.collideWorld = false;
  this.gravity      = 500;
  this.startPos     = { x: 0, y: 0 };
  // this.linearDamping = 0.2;
  
  this.runnerMode   = false;

  this.jumpHeight   = 75;
  this.jumpVelocity     = 500;
  this.fallRate     = 0.25 ;

  
  

  this.maxSpeed = 200;
  this.currentSpeed = 0;
  this.accelRate    = 10; // 5 isn't working correctly
  this.accelFactor = 0.2;
  this.decelRate    = 10;



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
    this.sprite.body.collideWorldBounds = this.collideWorld;
    this.sprite.body.linearDamping = this.linearDamping;

    // Animations
    //                    .add( name, frames, framerate, loop )
    this.sprite.animations.add('idle', [ 0 ], 10, true );
    this.sprite.animations.add('left', [ 2 ], 10, true );
    this.sprite.animations.add('right', [ 1 ], 10, true );
  }
, update: function( controls ) {
    // Set speed
    this.sprite.body.velocity.x = this.currentSpeed;

    // Prevent exceeding jumpHeight

    /* This should really slow jumping speed as the desired apex is reached.
      Set a desired apex (jumpHeight), when within defined range of apex ( x ),
      reduce velocity.y by factor ( jumpApexFactor * x ) until velocity = 0
    */

    if ( this.isJumping ) {
      // Establish jump delta
      var jumpDelta = -( this.sprite.body.y - this.jumpStart );
      if ( jumpDelta > this.jumpHeight ) {
        this.sprite.body.velocity.y =  -( this.sprite.body.velocity.y * this.fallRate );
        this.isJumping = false;
      }
    }

    // Reset jump blocker when space is released
    if ( controls.jump.isUp ) this.blockJumping = false;


    // Movement
    if ( controls.cursors.left.isDown ) {
      this.moveLeft();
    }
    else if ( controls.cursors.right.isDown ) {
      this.moveRight();
    }
    else {
      this.idle();
    }

    // Jumping
    if ( !this.blockJumping
      && controls.jump.isDown
      && ( this.sprite.body.onFloor() || this.sprite.body.touching.down )
    ) {
      this.jump();
    }

    // Toggle endless runner mode
    controls.runnerModeToggle.onDown.add( function() {
      this.runnerMode = ( this.runnerMode  === true ) ? false : true;
    }, this );


  }

, render: function() {
    if ( this.debug ) {
      game.debug.renderPhysicsBody( this.sprite.body );
      game.debug.renderText('Current speed: ' + this.currentSpeed, 32, 32 );
    }
  }

/*==========  Player actions  ==========*/
, idle: function() {
    /* Slows down currentSpeed to zero */
    if ( this.currentSpeed > 0 ) {
      this.currentSpeed -= this.decelRate;
    } else if ( this.currentSpeed < 0 ) {
      this.currentSpeed += this.decelRate;
    } else {
      this.currentSpeed = 0;
    }

    // Animation
    if ( this.facing != 'idle') {
      this.sprite.animations.play('idle');
      this.facing = 'idle';
    }
  }

, moveLeft: function() {
    /* Decreases currentSpeed */

    this.currentSpeed -= this.accelRate;
    if ( -this.currentSpeed > this.maxSpeed ) {
      this.currentSpeed = -this.maxSpeed;
    }

    if ( this.facing != 'left') {
      this.sprite.animations.play('left');
      this.facing = 'left';
    }
  }

, moveRight: function() {
    /* Increases currentSpeed */
    this.currentSpeed += this.accelRate;
    if ( this.currentSpeed > this.maxSpeed ) {
      this.currentSpeed = this.maxSpeed;
    }

    if ( this.facing != 'right') {
      this.sprite.animations.play('right');
      this.facing = 'right';
    }
  }

, jump: function() {
    this.jumpStart    = this.sprite.body.y;
    this.isJumping    = true;
    this.blockJumping = true;

    this.sprite.body.velocity.y = -this.jumpVelocity
  }

};
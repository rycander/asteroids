(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Asteroids = window.Asteroids;
  
  var Game = window.Asteroids.Game = function (opts) {
    this.DIM_X = opts.width;
    this.DIM_Y = opts.height;
    this.NUM_ASTEROIDS = opts.numAsteroids;
    this.asteroids = [];
    this.addAsteroids(this.NUM_ASTEROIDS);
    this.ship = new Asteroids.Ship({
      pos: this.randomPos(),
      game: this
    });
  };
  
  Game.prototype.addAsteroids = function (number) {
    for(var i = 0; i < number; ++i) {
      //console.log(DIM_X);
      var randPos = this.randomPos();
      var newAsteroid = new Asteroids.Asteroid({pos: randPos, game: this});
      this.asteroids.push(newAsteroid);
    }
  };
  
  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this. DIM_Y);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
    for(var i = 0; i < this.asteroids.length; ++i) {
      //console.log(asteroids[i]);
      this.asteroids[i].draw(ctx);
    }
    this.ship.draw(ctx);
  };
  
  Game.prototype.randomPos = function () {
    return [
      Math.random() * this.DIM_X,
      Math.random() * this.DIM_Y
    ];
  };
  
  Game.prototype.update = function () {
    this.move();
    this.collide();
  };
  
  Game.prototype.move = function () {
    for(var i = 0; i < this.asteroids.length; ++i) {
      this.asteroids[i].move();
    }
    this.ship.move();
  };
  
  Game.prototype.collide = function () {
    for(var i = 0; i < this.asteroids.length; ++i) {
      if (this.ship.isCollidedWith(this.asteroids[i])) {
        this.ship.collideWith(this.asteroids[i]);
      }
      if (this.ship.firing && 
        this.asteroids[i].isCollidedWithRay(this.ship.laserStart, this.ship.laserEnd)) {
        this.asteroids[i].takeDamage(this.ship.laserPower);
        if (this.asteroids[i].dead()) {
          this.remove(this.asteroids[i]);
        }
      }
    }
  };
  
  Game.prototype.remove = function (object) {
    if (object instanceof Asteroids.Asteroid){
      this.asteroids.splice(this.asteroids.indexOf(object), 1);
    }
  };
  
})();
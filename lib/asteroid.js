(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Asteroid = window.Asteroids.Asteroid = function (opts) {
    opts.vel = window.Asteroids.Util.randomVel(0.5, 0.5);
    opts.radius = Math.random() * 50 + 20;
    opts.color = COLOR;
    this.hp = opts.radius;
    this.shakeCounter = 0;
    window.Asteroids.MovingObject.call(this, opts);
    
  };
  
  var COLOR = "#FFFFFF";
  
  window.Asteroids.Util.inherits(Asteroid, window.Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (obj){
    if (obj instanceof window.Asteroids.bullet) {
      this.game.remove(this);
    }
  };

  Asteroid.prototype.takeDamage = function (dmg) {
    this.hp -= dmg;
    this.shakeCounter = true;
  };

  Asteroid.prototype.dead = function () {
    return this.hp <= 0;
  };

  Asteroid.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    
    ctx.arc(
      this.pos[0] + this.shakeCounter * 10 * (Math.random() - 0.5),
      this.pos[1] + this.shakeCounter * 10 * (Math.random() - 0.5),
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    if (this.shakeCounter > 0) {
      this.shakeCounter -= 0.1;
    }
    
    ctx.fill();
    
  };
})();
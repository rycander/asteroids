(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Asteroid = window.Asteroids.Asteroid = function (opts) {
    opts.vel = window.Asteroids.Util.randomVel(0.5, 0.5);
    opts.radius = Math.random() * 50 + 20;
    opts.color = COLOR;
    window.Asteroids.MovingObject.call(this, opts);
    
  };
  
  var COLOR = "#FFFFFF";
  
  window.Asteroids.Util.inherits(Asteroid, window.Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (obj){
    if (obj instanceof window.Asteroids.bullet) {
      this.game.remove(this);
    }
  };
})();
(function (){
  if (typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  }
  
  var Ship = window.Asteroids.Ship = function (opts) {
    opts.vel = [0,0];
    opts.radius = 10;
    opts.color = "#FFFFFF";
    opts.game = opts.game;
    window.Asteroids.MovingObject.call(this, opts);
    
    this.rotation = 0;
  };
  
  window.Asteroids.Util.inherits(Ship, window.Asteroids.MovingObject);
  
  Ship.prototype.collideWith = function (obj) {
    if(obj instanceof window.Asteroids.Asteroid) {
      this.relocate();
    }
  };
  
  Ship.prototype.draw = function (ctx) {
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    
    ctx.fill();
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius * 0.75,
      0,
      2 * Math.PI,
      false
    );
    
    ctx.fill();
  };
  
  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPos();
  };
})();
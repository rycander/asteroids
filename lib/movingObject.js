(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Util = window.Asteroids.Util;
  
  var MovingObject = window.Asteroids.MovingObject = function (opts) {
    this.pos = opts.pos;
    this.vel = opts.vel;
    this.radius = opts.radius;
    this.color = opts.color;
    this.game = opts.game;
  };
  
  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
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
    
  };
  
  MovingObject.prototype.move = function () {
    this.pos = [
      this.pos[0] + this.vel[0],
      this.pos[1] + this.vel[1]
    ];
    this.wrap();
  };
  
  MovingObject.prototype.wrap = function (){
    if(this.pos[0] + this.radius < 0){
      this.pos[0] += this.game.DIM_X + this.radius * 2;
    }else if(this.pos[0] - this.radius > this.game.DIM_X){
      this.pos[0] -= this.game.DIM_X + this.radius * 2;
    }
    
    if(this.pos[1] + this.radius < 0){
      this.pos[1] += this.game.DIM_Y + this.radius * 2;
    }else if(this.pos[1] - this.radius > this.game.DIM_Y){
      this.pos[1] -= this.game.DIM_Y + this.radius * 2;
    }
  };
  
  MovingObject.prototype.shake = function (magnitude) {
    var scalar = magnitude * 0.5;
    this.pos[0] += Math.random() * magnitude - scalar;
    this.pos[1] += Math.random() * magnitude - scalar;
  };
  
  MovingObject.prototype.isCollidedWith = function (obj) {
    var colDist = obj.radius + this.radius;
    var realDist = Util.distPoints(obj.pos, this.pos);
    if (colDist >  realDist) {
      return true;
    }
    return false;
  };
  
})();
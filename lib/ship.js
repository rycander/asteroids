(function (){
  if (typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var Util = window.Asteroids.Util;
  
  var Ship = window.Asteroids.Ship = function (opts) {
    opts.vel = [0,0];
    opts.radius = 10;
    opts.color = "#FFFFFF";
    opts.game = opts.game;
    window.Asteroids.MovingObject.call(this, opts);
    
    this.rotation = 0;
    this.rotationSpeed = Math.PI / 150;
    this.bindKeys();
    this.maxSpeed = 10;
    this.laserPower = this.radius * 5;
  };
  
  window.Asteroids.Util.inherits(Ship, window.Asteroids.MovingObject);
  
  Ship.prototype.collideWith = function (obj) {
    if(obj instanceof window.Asteroids.Asteroid) {
      this.relocate();
    }
  };
  
  Ship.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(Math.PI * this.rotation);
    this.drawShipBody(ctx);
    if(this.firing) this.drawLaser(ctx);
    ctx.restore();

    // this.drawLaser(ctx);
  };

  Ship.prototype.drawLaser = function (ctx) {
    var lasLength = ctx.canvas.height + ctx.canvas.width;
    // ctx.save();
    // ctx.strokeStyle = "#FF0000";
    // ctx.beginPath();
    // ctx.moveTo(this.laserStart);
    // ctx.lineTo(this.laserEnd);
    // ctx.stroke();
    // ctx.restore();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(
      -this.laserPower, 
      this.laserPower,
      this.laserPower * 2,
      lasLength
    );
    ctx.globalAlpha = 0.5;
    ctx.fillRect(
      -this.laserPower * 2, 
      this.laserPower,
      this.laserPower * 4,
      lasLength
    );
  };

  Ship.prototype.drawShipBody = function (ctx){
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    
    ctx.arc(
      0,
      0,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    
    ctx.fill();

    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    
    ctx.arc(
      0,//this.pos[0],
      this.radius * 1.5,
      1,
      0,
      2 * Math.PI,
      false
    );
    
    ctx.fill();

    ctx.fillStyle = "#000000";
    ctx.beginPath();
    
    ctx.arc(
      0,//this.pos[0],
      0 + this.radius*0.25,//this.pos[1] - this.radius * 0.25,
      this.radius * 0.75,
      0,
      2 * Math.PI,
      false
    );
    
    ctx.fill();
  };

  Ship.prototype.fireLaser = function () {

  };

  Ship.prototype.move = function (){
    if(this.wdown) {
      accel = Util.vecFromAngle(0.1, -this.rotation * Math.PI);
      this.vel = [
        this.vel[0] + accel[0],
        this.vel[1] + accel[1]
      ];
    }

    if(this.spacedown) {
      accel = Util.vecFromAngle(-0.004 * this.laserPower, -this.rotation * Math.PI);
      this.vel = [
        this.vel[0] + accel[0],
        this.vel[1] + accel[1]
      ];
      this.firing = true;
      this.rotationSpeed = Math.PI / 1000;
      this.laserStart = Util.vecAdd(this.pos, Util.vecFromAngle(this.radius, -this.rotation * Math.PI));
      this.laserEnd = Util.vecAdd(
        this.pos,
        Util.vecFromAngle(
          Math.max(ctx.canvas.height, ctx.canvas.width) + this.radius, -this.rotation * Math.PI
        )
      );
      if (this.laserPower > 0) {
        this.laserPower--;
      }
    } else {
      this.firing = false;
      this.rotationSpeed = Math.PI / 150;
      if (this.laserPower < this.radius * 5) {
        ++this.laserPower;
      }
    }

    if(this.adown) {
      this.rotation -= this.rotationSpeed;
    }

    if(this.ddown) {
      this.rotation += this.rotationSpeed;
    }

    this.vel = Util.boundVec(this.vel, this.maxSpeed);

    this.pos = [
      this.pos[0] + this.vel[0],
      this.pos[1] + this.vel[1]
    ];
    this.wrap();
  };
  
  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPos();
    this.vel = [0,0];
  };

  Ship.prototype.bindKeys = function (){
    $("body").keydown( function (event) {
      if (event.which === 87){
        this.wdown = true;
      }
      if (event.which === 32){
        event.preventDefault();
        this.spacedown = true;
      }
      if (event.which === 65){
        this.adown = true;
      }
      if (event.which === 68){
        this.ddown = true;
      }
    }.bind(this));
    $("body").keyup( function (event) {
      if (event.which === 87){
        this.wdown = false;
      }
      if (event.which === 32){
        this.spacedown = false;
      }
      if (event.which === 65){
        this.adown = false;
      }
      if (event.which === 68){
        this.ddown = false;
      }
    }.bind(this));

  };

  Ship.prototype.unbindKeys = function (){
    //TODO
  };
})();
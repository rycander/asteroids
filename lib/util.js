(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Util = window.Asteroids.Util = function () {};
  
  Util.inherits = function (ChildClass, BaseClass) {
    var Surrogate = function () {};
    Surrogate.prototype = BaseClass.prototype;
    ChildClass.prototype = new Surrogate();
  };
  
  Util.randomVel = function (leng, variance) {
    var angle = Math.random() * 2 * Math.PI;
    var scalar = (Math.random() * variance) + leng;
    return Util.vecFromAngle(scalar, angle);
  };

  Util.vecFromAngle = function (scalar, angle) {
    var xVel = Math.sin(angle) * scalar;
    var yVel = Math.cos(angle) * scalar;
    return [xVel, yVel];
  };

  Util.vecAdd = function (vec1, vec2) {
    return [vec1[0] + vec2[0], vec1[1] + vec2[1]];
  };

  Util.vecSub = function (vec1, vec2) {
    return [vec1[0] - vec2[0], vec1[1] - vec2[1]];
  };

  Util.vecDot = function (vec1, vec2) {
    return vec1[0] * vec2[0] + vec1[1] * vec2[1];
  };
  
  Util.wrapPosition = function (pos) {
    var newPos = pos;
    var xMax = window.Asteroids.Game.DIM_X;
    var yMax = window.Asteroids.Game.DIM_Y;
    
    if(newPos[0] > xMax) {
      newPos[0] -= xMax;
    }else if(newPos[0] < xMax) {
      newPos[0] += xMax;
    }
    
    if(newPos[1] > yMax) {
      newPos[1] -= xMax;
    }else if(newPos[1] < yMax) {
      newPos[1] += yMax;
    }
    
    return newPos;
  };
  
  Util.distPoints = function (pos1, pos2) {
    var a = pos1[0] - pos2[0];
    var b = pos1[1] - pos2[1];
    return Math.sqrt((a * a) + (b * b));
  };
  
  var randomSign = function () {
    var rand = Math.random() - 0.5;
    var sign = rand / Math.abs(rand);
    return sign;
  };
  
  Util.removeDups = function (array) {
    var uniq = [];
    for(var i = 0; i < array.length; ++i) {
      if (uniq.indexOf(array[i]) === -1) {
        uniq.push(array[i]);
      }
    }
    return uniq;
  };
  
})();
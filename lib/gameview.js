(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var GameView = window.Asteroids.GameView = function(opts) {
    this.game = new window.Asteroids.Game({
      height: opts.height,
      width: opts.width,
      numAsteroids: Math.ceil(opts.height * opts.width / 25000)
    });
    this.ctx = opts.ctx;
  };
  
  GameView.prototype.start = function () {
    window.setInterval((function () {
      this.game.update();
      this.game.draw(this.ctx);
    }).bind(this), 10);
  };
  
  
})();
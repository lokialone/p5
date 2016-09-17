var Vector = require('./Vector');
var Ball = require('./Ball');

var Gravitation = function() {

    var attactor,balls=[];
    setup = function() {
      createCanvas(800,480);
  	 	background(224);
      attactor =  new Attractor();
      for(var i = 0; i < 20; i++){
        balls[i] = new Ball(random(5,30),random(0,width),random(0,height));
      }
    }

    draw = function() {
      background(224);
      attactor.render();
      for(var i = 0; i < 20; i++){
        balls[i].render();
        balls[i].acceleration = new Vector(0,0);
        var force = attactor.attract(balls[i]);
        balls[i].applyForce(force);
        balls[i].update();
      }
    }

    function Attractor() {
      this.mass = 20;
      this.G = 0.4;
      this.location =  new Vector(width / 2,height / 2);
    }

    Attractor.prototype.render = function() {
      stroke(0);
      fill(175,200);
      ellipse(this.location.x,this.location.y,this.mass*2,this.mass*2);
    }

    Attractor.prototype.attract = function(m) {
      var dir = Vector.dir(this.location,m.location);
      var distance = dir.mag();
      distance = constrain(distance,5,25);
      var forceSize = this.mass * m.mass * this.G / (distance * distance);
      dir.normalize();
      dir.mult(forceSize);
      return dir;
    }

}
module.exports = Gravitation;

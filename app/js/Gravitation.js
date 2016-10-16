var Vector = require('./Vector');
var Ball = require('./Ball');
var p5 = require('p5');
var Gravitation = function(p) {
    var balls=[];
    var attractor = '';
    p.setup = function() {
      p.createCanvas(800,480);
  	 	p.background(224);
      attractor =  new Ball(100,p.width/2,p.height/2);
      attractor.setG = 400;
      // attractor.setColor(p.color(0,153,255));
      for(var i = 0; i < 20; i++){
        balls[i] = new Ball(p.random(5,30),p.random(0,p.width),p.random(0,p.height));
      }
    }

    p.draw = function() {
      p.background(224);
      attractor.render(p);
      for(var i = 0; i < 20; i++){
        balls[i].render(p);
        balls[i].acceleration = new Vector(0,0);
        var force = attractor.attract(balls[i],p);
        balls[i].applyForce(force);
        balls[i].update();
      }
    }
}
module.exports = Gravitation;

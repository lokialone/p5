var Vector =  require('./Vector');
var Ball =  require('./Ball');
var p5 = require('p5')

var Attract =  function(p) {
      var balls = [];
      p.setup = function() {
        p.createCanvas(800,640);
        p.background(224);
        for(var i = 0;i < 20; i++){
          balls[i] = new Ball(p.random(10,40),p.random(0,p.width),p.random(0,p.height));
        }
      }

      p.draw = function() {
        p.background(224);
        for(var i = 0;i < 20;i++){
          balls[i].render(p);
          for(var j = 0;j < 20;j++){
            if(i !== j){
              balls[j].acceleration = new Vector(0,0);
              var force  = balls[i].attract(balls[j],p);
              balls[j].applyForce(force);
              balls[j].update();
            }
          }
        }
      }
      // p.mousePressed = function() {
      //   p.remove();
      // }

}

module.exports = Attract;

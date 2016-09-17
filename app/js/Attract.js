var Vector =  require('./Vector');
var Ball =  require('./Ball');

var Attract =  function() {

      var balls = [];
      setup = function() {
        createCanvas(800,640);
        background(224);
        for(var i = 0;i < 20; i++){
          balls[i] = new Ball(random(10,40),random(0,width),random(0,height));
        }
      }

      draw = function() {
        background(224);
        for(var i = 0;i < 20;i++){
          balls[i].render();
          for(var j = 0;j < 20;j++){
            if(i !== j){
              balls[j].acceleration = new Vector(0,0);
              var force  = balls[i].attract(balls[j]);
              balls[j].applyForce(force);
              balls[j].update();
            }
          }
        }
      }
}

module.exports = Attract;

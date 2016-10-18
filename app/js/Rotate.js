var Rotate = function(p){
  this.angle = 0;
  this.aVelocity = 0;
  this.aAcceleration = 0.001;

  p.setup = function(){
    p.createCanvas(640,360);
  }
  p.draw = function(){
    p.background(255);
    p.fill(175);
    p.stroke(0);
    p.rectMode(p.CENTER);
    p.translate(p.width/2,p.height/2);
    p.rotate(this.angle);
    p.line(-50,0,50,0);
    p.ellipse(50,0,20,20);
    p.ellipse(-50,0,20,20);

    if(this.aVelocity >=0.05){
      this.aAcceleration = 0;
    }
    this.aVelocity += this.aAcceleration;
    this.angle += this.aVelocity;

  }
  p.mousePressed = function(){
    
  }
}

module.exports = Rotate;

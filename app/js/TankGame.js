
var Tank = function(){
  this.tankWidth = 50;
  this.tankHeight = 40;
  this.bulletSize = 5;
  this.cannonHeight = 30;
  this.cannonDiameter = 6;
  this.difference = 10;
  // tank的圆角
  this.borderRadius = 5;
}

Tank.prototype.render = function(p) {
  p.fill(255, 204, 0);
  p.rect(p.width/2 - this.tankWidth/2, p.height - this.tankHeight, this.tankWidth, this.tankHeight,this.borderRadius);
  p.fill(153, 204, 0);
  p.rect(p.width/2 - this.tankWidth/2 + this.difference , p.height - this.tankHeight + this.difference, this.tankWidth - 2 * this.difference, this.tankHeight - 2 * this.difference,this.borderRadius);
  p.fill(255,255,255);
  p.rect(p.width/2 - this.cannonDiameter/2,p.height - this.tankHeight + this.difference - this.cannonHeight,this.cannonDiameter,this.cannonHeight);

}

var TankGame = function(p){

  var tank = new Tank();

  p.setup = function() {
    p.createCanvas(800,640);
    p.background(224);
  }
  p.draw = function() {
    tank.render(p);

  }
}

module.exports = TankGame;

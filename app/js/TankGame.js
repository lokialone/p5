var Bullet = function(x,y) {
  this.bulletSize = 4;
  this.orgin_x = x;
  this.orgin_y = y;
  this.x = x;
  this.y = y;
  this.grap = 4;
}
Bullet.prototype.render = function(p) {

  p.rect(this.x - this.bulletSize / 2, this.y - this.bulletSize,this.bulletSize,this.bulletSize);
}

Bullet.prototype.update = function(){
   this.y-= this.grap ;
   if(this.y <= 0){
     this.y = this.orgin_y;
   }

}
var Tank = function(){
  this.tankWidth = 50;
  this.tankHeight = 40;

  this.cannonHeight = 30;
  this.cannonDiameter = 6;
  this.difference = 10;
  // tank的圆角
  this.borderRadius = 5;
  this.slotBulletFlag = true;
}

Tank.prototype.switchSlotBulletFlag = function(status) {
  this.slotBulletFlag = status;
}

Tank.prototype.render = function(p) {
  p.fill(255, 204, 0);
  p.rect(p.width/2 - this.tankWidth/2, p.height - this.tankHeight, this.tankWidth, this.tankHeight,this.borderRadius);
  p.fill(153, 204, 0);
  p.rect(p.width/2 - this.tankWidth/2 + this.difference , p.height - this.tankHeight + this.difference, this.tankWidth - 2 * this.difference, this.tankHeight - 2 * this.difference,this.borderRadius);
  p.fill(255,255,255);
  p.rect(p.width/2 - this.cannonDiameter/2,p.height - this.tankHeight + this.difference - this.cannonHeight,this.cannonDiameter,this.cannonHeight);

}

Tank.prototype.slotBullet = function(p) {

}

var TankGame = function(p){

  var tank = new Tank();
  var bullets = [];
  var bulletsCounts = 100;
  var bullet = [];

  p.setup = function() {
    p.createCanvas(800,640);
    p.background(224);
    p.fill(255,204,0);
    bullet = new Bullet(400,580);
    // for(var i = 0; i < bulletsCounts; i++){
    //   bullets[i] = new Bullet(p.width,p.height - tank.tankHeight + tank.difference - tank.cannonHeight);
    // }
  }
  p.draw = function() {
    p.background(224);
    tank.render(p);
    bullet.render(p);
    bullet.update();
    // for(var i = 0; i < bulletsCounts; i++){
    //   bullets[i].update();
    //   bullets[i].render(p);
    // }

  }
}

module.exports = TankGame;

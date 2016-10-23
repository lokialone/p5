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

  this.gunturretWidth = 30;
  this.gunturretHeight = 20;

  this.cannonHeight = 30;
  this.cannonDiameter = 6;

  // tank的圆角
  this.borderRadius = 5;
  this.slotBulletFlag = true;
  // tank的重心坐标
  this.center_x = 0;
  this.center_y = 0;

  this.step = 10;
}

Tank.prototype.switchSlotBulletFlag = function(status) {
  this.slotBulletFlag = status;
}

Tank.prototype.setCenter =  function(p){
  this.center_x = p.width / 2;
  this.center_y = p.height - this.tankHeight / 2;
}

Tank.prototype.updateCenter = function(x,y){
  this.center_x = x;
  this.center_y = y;
}

Tank.prototype.turnLeft = function(p){
  console.log('lefe');
  // p.translate(this.center_x, this.center_y);
  p.rotate(p.PI/2);
}

Tank.prototype.goForward = function(){
  this.center_y -= this.step;
}

Tank.prototype.goBack = function() {
  this.center_y += this.step;
}
Tank.prototype.render = function(p) {

  // 坦克的body
  p.fill(255, 204, 0);
  p.rect(this.center_x - this.tankWidth / 2, this.center_y - this.tankHeight / 2, this.tankWidth, this.tankHeight,this.borderRadius);
  //坦克的炮台
  p.fill(153, 204, 0);
  p.rect(this.center_x - this.gunturretWidth / 2 , this.center_y - this.gunturretHeight / 2, this.gunturretWidth, this.gunturretHeight,this.borderRadius);
  // 坦克的大炮
  p.fill(255,255,255);
  p.rect(this.center_x - this.cannonDiameter / 2, this.center_y - this.gunturretHeight / 2 - this.cannonHeight,this.cannonDiameter,this.cannonHeight);

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
    tank.setCenter(p);
    bullet = new Bullet(400,580);

  }
  p.draw = function() {
    p.background(224);
    if (p.keyIsDown(p.LEFT_ARROW)) {

    }
    if (p.keyIsDown(p.UP_ARROW)) {
      tank.goForward();
    }
    if (p.keyIsDown(p.DOWN_ARROW)) {
        tank.goBack();
    }
    tank.render(p);
    bullet.render(p);
    bullet.update();
  }

}

module.exports = TankGame;

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
  this.margin = 30;
  // tank的重心坐标
  this.center_x = 0;
  this.center_y = 0;
  this.rotation = 0;
  this.step = 10;

  this.Direction = {
    UP : 0,
    RIGHT: Math.PI / 2,
    DOWN: Math.PI ,
    LEFT: Math.PI * 3 / 2
  }
}

Tank.prototype.switchSlotBulletFlag = function(status) {
  this.slotBulletFlag = status;
}

Tank.prototype.setCenter =  function(p){
  this.center_x = p.width / 2;
  this.center_y = p.height - this.tankHeight / 2 - this.margin;
}

Tank.prototype.updateCenter = function(x,y){
  this.center_x = x;
  this.center_y = y;
}

Tank.prototype.turnLeft = function(p){
  p.rotate(p.PI/2);
}

Tank.prototype.goForward = function(){
  this.center_y -= this.step;
}

Tank.prototype.rotate = function(deg){
  this.rotation = deg;
}

Tank.prototype.setDirection = function(direction){
  if(this.rotation !== direction){
    this.rotate(direction);
  }
}

Tank.prototype.goLeft = function(){
  this.setDirection(this.Direction.LEFT);
  this.center_x--;
}
Tank.prototype.goRight = function() {
  this.setDirection(this.Direction.RIGHT);
  this.center_x++;
}

Tank.prototype.goUp = function() {
  this.setDirection(this.Direction.UP);
  this.center_y--;
}

Tank.prototype.goDown = function() {
  this.setDirection(this.Direction.DOWN);
  this.center_y++;
}

Tank.prototype.goBack = function() {
  this.center_y += this.step;
}
Tank.prototype.render = function(p) {

  p.push();
  // 坦克的body
  p.translate(this.center_x, this.center_y);
  p.rotate(this.rotation);
  p.fill(255, 204, 0);
  p.rect(-this.tankWidth / 2, -this.tankHeight / 2, this.tankWidth, this.tankHeight,this.borderRadius);
  //坦克的炮台
  p.fill(153, 204, 0);
  p.rect(- this.gunturretWidth / 2 , - this.gunturretHeight / 2, this.gunturretWidth, this.gunturretHeight,this.borderRadius);
  // 坦克的大炮
  p.fill(255,255,255);
  p.rect( - this.cannonDiameter / 2,  - this.gunturretHeight / 2 - this.cannonHeight,this.cannonDiameter,this.cannonHeight);

  p.pop();
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
    if(p.keyIsDown(p.LEFT_ARROW)) {
      tank.goLeft();
    }
    if(p.keyIsDown(p.UP_ARROW)) {
      tank.goUp();
    }
    if(p.keyIsDown(p.DOWN_ARROW)) {
      tank.goDown();
    }
    if(p.keyIsDown(p.RIGHT_ARROW)) {
      tank.goRight();
    }
    tank.render(p);
    bullet.render(p);
    bullet.update();
  }

}

module.exports = TankGame;

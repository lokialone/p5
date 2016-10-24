var Bullet = function() {
  this.bulletSize = 4;
  this.x = 0;
  this.y = 0;
  this.grap = 4;
}

Bullet.prototype.render = function(p) {
  p.rect(this.x - this.bulletSize / 2, this.y - this.bulletSize,this.bulletSize,this.bulletSize);
}

Bullet.prototype.setLocation = function(x,y) {
  this.x = x;
  this.y = y;
}

Bullet.prototype.update = function(){
     this.y-= this.grap ;
     if(this.y <= 0){
       this.y = -bulletSize;
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
  this.step = 2;

  this.bullet = new Bullet();
  this.slotFlag = false;

  this.Direction = {
    UP : 0,
    RIGHT: Math.PI / 2,
    DOWN: Math.PI ,
    LEFT: Math.PI * 3 / 2
  }
}

Tank.prototype.setCenter =  function(p){
  this.center_x = p.width / 2;
  this.center_y = p.height - this.tankHeight / 2 - this.margin;
}

Tank.prototype.updateCenter = function(x,y){
  this.center_x = x;
  this.center_y = y;
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
  this.center_x-=this.step;
}
Tank.prototype.goRight = function() {
  this.setDirection(this.Direction.RIGHT);
  this.center_x+=this.step;
}

Tank.prototype.goUp = function() {
  this.setDirection(this.Direction.UP);
  this.center_y-=this.step;
}

Tank.prototype.goDown = function() {
  this.setDirection(this.Direction.DOWN);
  this.center_y+=this.step;
}

Tank.prototype.slotBullet = function() {
  this.slotFlag = true;
  console.log(this.bullet);
  this.bullet.setLocation(this.center_x.center_y);


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

var TankGame = function(p){

  var tank = new Tank();
  var bulletsCounts = 100;

  p.setup = function() {
    p.createCanvas(800,640);
    p.background(224);
    p.fill(255,204,0);
    tank.setCenter(p);

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

    if(p.keyIsDown(p.CONTROL)){
      tank.slotBullet();
      console.log(tank.slotFlag);
    }

    if(tank.slotFlag){
      tank.bullet.update();
    }
    tank.render(p);
    tank.bullet.render(p);


  }

}

module.exports = TankGame;

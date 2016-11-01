var Direction = {
  UP: 0,
  RIGHT: Math.PI / 2,
  DOWN: Math.PI ,
  LEFT: Math.PI * 3 / 2
}

var Bullet = function(x,y,direction) {
  this.bulletSize = 4;
  this.x = x;
  this.y = y;
  this.grap = 4;
  this.direction = direction;
  this.power = 1;
  this.isLive = true;
}

Bullet.prototype.render = function(p) {
  p.rect(this.x - this.bulletSize / 2, this.y - this.bulletSize,this.bulletSize,this.bulletSize);
}

Bullet.prototype.setLocation = function(x,y) {
  this.x = x;
  this.y = y;
}

Bullet.prototype.setDirection = function(direction) {
  this.direction = direction
}

Bullet.prototype.update = function(p){
    switch (this.direction) {
      case Direction.UP:
          this.y-=this.grap;
          break;
      case Direction.DOWN:
          this.y+=this.grap;
          break;
      case Direction.RIGHT:
          this.x+=this.grap;
          break;
      case Direction.LEFT:
          this.x-=this.grap;
          break;
      default:
          this.x+=this.grap;
    }
    this.checkEdges(p.width,p.height);

}

Bullet.prototype.checkEdges = function(width,height){
  if(this.x >= width || this.x <= 0 || this.y >= height || this.y <= 0){
    this.y = -this.bulletSize;
  }
}

var Tank = function(){

  this.tankWidth = 50;
  this.tankHeight = 50;

  this.gunturretWidth = 30;
  this.gunturretHeight = 20;

  this.cannonHeight = 30;
  this.cannonDiameter = 6;

  // tank的圆角
  this.borderRadius = 5;
  this.slotBulletFlag = true;
  this.margin = 5;
  // tank的重心坐标
  this.center_x = 0;
  this.center_y = 0;

  this.direction = 0;
  this.step = 2;

  this.bullets = [];
  this.bulletsCounts = 0;
}

Tank.prototype.setCenter =  function(x,y){
  this.center_x = x;
  this.center_y = y;
}

Tank.prototype.updateCenter = function(x,y){
  this.center_x = x;
  this.center_y = y;
}

Tank.prototype.rotate = function(deg){
  this.direction = deg;
}

Tank.prototype.setDirection = function(direction){
  if(this.direction !== direction){
    this.rotate(direction);
  }
}

Tank.prototype.goLeft = function(){
  this.setDirection(Direction.LEFT);
  this.center_x-=this.step;
}

Tank.prototype.goRight = function() {
  this.setDirection(Direction.RIGHT);
  this.center_x+=this.step;
}

Tank.prototype.goUp = function() {
  this.setDirection(Direction.UP);
  this.center_y-=this.step;
}

Tank.prototype.goDown = function() {
  this.setDirection(Direction.DOWN);
  this.center_y+=this.step;
}

Tank.prototype.slotBullet = function() {
  this.bullets[this.bulletsCounts] = new Bullet(this.center_x,this.center_y,this.direction);
  this.bulletsCounts++;

}

Tank.prototype.render = function(p) {

  // render bullets
  for(var i = 0; i < this.bulletsCounts; i++){
    this.bullets[i].render(p);
    this.bullets[i].update(p);
  }

  p.push();
  // 坦克的body
  p.translate(this.center_x, this.center_y);
  p.rotate(this.direction);
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

var EnemyTank = function(min,x_max,y_max) {
  Tank.call(this);
  this.edge_min = min;
  this.edge_x_max = x_max;
  this.edge_y_max = y_max;
  this.step = 1;
  this.dirs=['UP','DOWN','LEFT','RIGHT'];
}

EnemyTank.prototype = new Tank();

EnemyTank.prototype.autoMove = function(p) {
  this.render(p);
  this.autoUpdate(p);
}

EnemyTank.prototype.autoUpdate = function(p){

    this.goForward();
    if(this.isEdges()){
      this.findDirection();
    }
}

EnemyTank.prototype.isEdges =  function() {
  if(this.center_x <= this.edge_min || this.center_x >= this.edge_x_max || this.center_y <=this.edge_min || this.center_y >=this.edge_y_max ){
    return true;
  }
  return false;
}

EnemyTank.prototype.goForward = function(rate) {
    if(arguments.length === 0){
      var rate = 1;
    }

    switch (this.direction) {
      case Direction.UP:
        this.center_y-=this.step*rate;
        break;
      case Direction.DOWN:
        this.center_y+=this.step*rate;
        break;
      case Direction.LEFT:
        this.center_x-=this.step*rate;
        break;
      case Direction.RIGHT:
        this.center_x+=this.step*rate;
        break;
      default:
        this.center_y+=this.step*rate;
    }
}

EnemyTank.prototype.findDirection = function() {
      
      for(var dir in Direction){
        if(this.direction === Direction[dir])
          continue;
        this.setDirection(Direction[dir]);
        this.goForward();
        if(!this.isEdges()){
          this.goForward(-1);
          break;
        }
        this.goForward(-1);
      }


}

EnemyTank.prototype.autoSlot = function() {

}

var TankGame = function(p){

  const EDGE_MIN = 40;
  var tank = new Tank();
  var enemyTank = [];
  var enemyTankCounts = 3;

  p.setup = function() {
    p.createCanvas(800,640);
    p.background(224);
    p.fill(255,204,0);
    tank.setCenter(p.width / 2, p.height - 60);
    var enemyTankLocation = [ {x:EDGE_MIN,y:60},{x:p.width/2-25,y:60},{x:p.width-EDGE_MIN,y:60} ];
    for(var i = 0; i < enemyTankCounts;i++){
      enemyTank[i] = new EnemyTank(EDGE_MIN,p.width-EDGE_MIN,p.height-EDGE_MIN);
      enemyTank[i].setCenter(enemyTankLocation[i].x,enemyTankLocation[i].y);
      enemyTank[i].setDirection(Direction.DOWN);
    }
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
    for(var i = 0; i < enemyTankCounts;i++){
      enemyTank[i].autoMove(p);
    }

  }

  p.keyPressed = function() {
    if(p.keyCode === p.CONTROL){
      tank.slotBullet();
    }
  }
}

module.exports = TankGame;

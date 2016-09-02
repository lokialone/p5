var bouncing = function() {

	var ball;

	setup = function() {
	 	createCanvas(640,480);
	 	background(224);
	 	ball = new Ball();
	 }

	 draw = function() {
	 	background(224);
		ball.run();
	 }

	 /**
	  * Ball object
	  */
	 function Ball() {
	 	this.x = random(0,width);
	 	this.y = random(0,height);
	 	this.dx = 1;
	 	this.dy = 1;
	 }

	 Ball.prototype.run = function() {
	 	this.update();
	 	this.render();
	 }

	 Ball.prototype.update = function() {
	 	this.x = this.x + this.dx;
	 	this.y = this.y + this.dy;

	 	if(this.x >= width || this.x <= 0){
	 		this.dx = -this.dx;
	 	}
	 	if(this.y >= height || this.y <= 0){
	 		this.dy = -this.dy;
	 	}
	 }

	 Ball.prototype.render = function() {
	 	stroke(0);
	 	fill(40);
	 	ellipse(this.x,this.y,20,20);
	 }
}
/**
 * [location]
 * @param  {[type]} x [description]
 * @param  {[type]} y [description]
 * @return {[type]}   [description]
 */
var Location = function(x,y){
	this.x = x;
	this.y = y;
} 

Location.prototype.add = function(vector){
	this.x = this.x + vector.dx;
	this.y = this.y + vector.dy;
}

var Vector = function(dx,dy){
	this.dx = dx;
	this.dy = dy;
}

var vector_bouncing = function(){
	var ball;

	setup = function() {
	 	createCanvas(640,480);
	 	background(224);
	 	ball = new Ball();
	 }

	 draw = function() {
	 	background(224);
		ball.run();
	 }

	 function Ball(){
	 	this.location = new Location(random(0,width),random(0,height));
	 	this.vector = new Vector(1,1);
	 }

	  Ball.prototype.run = function() {
	 	this.update();
	 	this.render();
	 }

	 Ball.prototype.update = function() {
	 
	 	this.location.add(this.vector);
	  	
	 	if(this.location.x >= width || this.location.x <= 0){
	 		this.vector.dx = -this.vector.dx;
	 	}
	 	if(this.location.y >= height || this.location.y <= 0){
	 		this.vector.dy = -this.vector.dy;
	 	}
	 }

	 Ball.prototype.render = function() {
	 	stroke(0);
	 	fill(90);
	 	ellipse(this.location.x,this.location.y,30,30);
	 }
}

exports.bouncing = bouncing;
exports.vector_bouncing = vector_bouncing


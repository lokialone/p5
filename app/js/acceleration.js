var Vector = require('./Vector');

var acceleration = function() {

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
		this.location = new Vector(random(0,width),random(0,height));
		this.velocity = new Vector(0,0);
		this.acceleration = new Vector(0,0);
 	}

	Ball.prototype.run = function() {
	 	this.update();
	 	this.render();
	 }

 	Ball.prototype.update = function() {

 		var mouse = new Vector(mouseX,mouseY);
 		var dir  = mouse.getSubObject(this.location);

 		dir.normalize();
 		dir.mult(0.1);

 		this.acceleration = dir;
 
	 	this.velocity.add(this.acceleration);
	 	this.velocity.limit(3);
	 	this.location.add(this.velocity);
	 	this.checkEage();
 	}

 	Ball.prototype.checkEage = function() {

 		if(this.location.x >= width || this.location.x <= 0){
	 		this.velocity.x = -this.velocity.x;
	 	}
	 	if(this.location.y >= height || this.location.y <= 0){
	 		this.velocity.y = -this.velocity.y;
 		}
 	}

 	Ball.prototype.render = function() {
	 	stroke(0);
	 	fill(90);
	 	ellipse(this.location.x,this.location.y,30,30);
 	}
}
exports.acceleration = acceleration;
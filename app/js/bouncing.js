var bouncing = function() {

	var ball;

	setup = function() {
	 	createCanvas(640,480);
	 	noStroke();
	 	background(255);
	 	ball = new Ball();
	 }

	 draw = function() {
	 	background(255);
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

var bouncing_vector = function() {

}

exports.bouncing = bouncing;


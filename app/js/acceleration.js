
function Vector(x,y) {
	this.x = x;
	this.y = y;
}

Vector.prototype.add = function(vector) {
	// if(!vector.hasOwnProperty('x') && !vector.hasOwnProperty('y'){
	// 	return;
	// }
	this.x += vector.x;
	this.y += vector.y;
}

Vector.prototype.limit = function(speed) {

	this.x = Math.min(this.x,speed);
	this.y = Math.min(this.y,speed);
	
}

Vector.prototype.mag = function() {

	return sqrt(this.x * this.x + this.y * this.y);

}
Vector.prototype.normalize = function() {

}

var acceleration = function() {

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
		this.velocity = new Vector(1,1);
		this.acceleration = new Vector(0.01,0.01);
 	}

	Ball.prototype.run = function() {
	 	this.update();
	 	this.render();
	 }

 	Ball.prototype.update = function() {
 
	 	this.location.add(this.velocity);
	 	this.velocity.add(this.acceleration);
	 	this.velocity.limit(3);
	  	
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
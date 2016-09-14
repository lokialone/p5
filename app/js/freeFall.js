var Vector = require('./Vector');
var freeFall = function(){

	var balls = [];
	setup = function() {
		createCanvas(640,480);
	 	background(224);
	 	for(var i = 0; i < 30;i++){
	 		balls[i] = new Ball();
	 	}
	}

	draw = function() {
		background(224);
		for(var i = 0; i < 30;i++){
			balls[i].run();
		}
	}

	function Ball(){

		this.mass = random(10,40);
		this.location = new Vector(random(10,width),30);
		this.velocity = new Vector(0,0.1); //初速度
		this.gravity = new Vector(0,0.01*this.mass); //重力
		this.wind = new Vector(0.01,0);
		this.acceleration = new Vector(0,0);
		this.applyForce(this.gravity);
		this.applyForce(this.wind);
 	}

	Ball.prototype.run = function() {
	 	this.update();
	 	this.render();
	 }
 	Ball.prototype.update = function() {

	 	this.velocity.add(this.acceleration);
	 	// this.velocity.limit(3);
	 	this.location.add(this.velocity);
	 	this.checkEage();
 	}
	Ball.prototype.applyForce = function(force){
		force.div(this.mass);
		this.acceleration.add(force);
	}
 	Ball.prototype.checkEage = function() {

 		if(this.location.x > width){
 			this.location.x = width ;
      		this.velocity.x = -(this.velocity.x);
    	} else if (this.location.x < 0) {
      		this.velocity.x = -(this.velocity.x);
      		this.location.x = 0;
    	}
	 	if(this.location.y > height  || this.location.y < 0){
	 		this.velocity.y = - (this.velocity.y);
	 		this.location.y = height;

 		}
 	}

 	Ball.prototype.render = function() {
	 	noStroke();
	 	fill(color(255, 0, 0, 0.2 * 255));
	 	ellipse(this.location.x,this.location.y,this.mass,this.mass);
 	}

}

module.exports = freeFall;

var Vector = require('./Vector');

var Ball = function(m,x,y){

		this.mass = m;
		this.location = new Vector(x,y);
		this.velocity = new Vector(0,0);
		this.acceleration  = new Vector(0,0);
 	}

	Ball.prototype.run = function() {
	 	this.update();
	 	this.render();
	 }
 	Ball.prototype.update = function() {
	 	this.velocity.add(this.acceleration);
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
      		this.velocity.x = - (this.velocity.x);
    	} else if (this.location.x < 0) {
      		this.velocity.x = - (this.velocity.x);
      		this.location.x = 0;
    	}
	 	if(this.location.y > height  || this.location.y < 0){
	 		this.velocity.y = - (this.velocity.y);
	 		this.location.y = height
 		}
 	}

 	Ball.prototype.render = function() {
	 	noStroke();
	 	fill(color(255, 122, 144, 0.8 * 255));
	 	ellipse(this.location.x,this.location.y,this.mass,this.mass);
 	}

 module.exports = Ball;

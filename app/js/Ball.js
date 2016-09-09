var Vector = require('./Vector'); 

var Ball = function(m,x,y,ax,ay){

		this.mass = m;
		this.location = new Vector();
		this.velocity = new Vector();
		this.acceleration  = new Vector();
		this.location.x = x;
		this.location.y = y;
		this.velocity.x = 0;
		this.velocity.y = 0;
		this.acceleration.x = ax;
		this.acceleration.y = ay; //重力	
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
var Ball = function(){
		this.mass = 0;
		this.location = 0;
		this.velocity = 0; //初速度
		this.gravity = 0; //重力	
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
	 	fill(color(255, 0, 0, 0.2 * 255));
	 	ellipse(this.location.x,this.location.y,this.mass,this.mass);
 	}

 module.exports = Ball;
var Vector = require('./Vector');

var Mover = function(x,y){

		this.location = new Vector(x,y);
    // 默认初始值
		this.velocity = new Vector(0,0);
		this.acceleration  = new Vector(0,0);
		this.G = 0.0009;
    this.mass = 1;
    // 关于旋转的值
    this.angle = 0;
    this.aVelocity = 0;
    this.aAcceleration = 0;
 	}
	Mover.prototype.setG = function(g){
		this.G = g
	}
  Mover.prototype.setMass = function(mass){
    this.mass = mass
  }

  Mover.prototype.setaAcceleration = function(aAcceleration){
    this.aAcceleration = aAcceleration;
  }

 	Mover.prototype.update = function() {
	 	this.velocity.add(this.acceleration);
	 	this.location.add(this.velocity);
		// this.checkEage();
 	}

  Mover.prototype.rotate = function(p,x,y) {
    p.rectMode(p.CENTER);
    p.translate(p.width/2,p.height/2);
    p.rotate(this.angle);
  }

	Mover.prototype.applyForce = function(force){
		force.div(this.mass);
		this.acceleration.add(force);
	}

	Mover.prototype.attract = function(m,p) {
		var dir = Vector.dir(this.location,m.location);
		var distance = dir.mag();
		distance = p.constrain(distance,5,25);
		var forceSize = this.mass * m.mass * this.G / (distance * distance);
		dir.normalize();
		dir.mult(forceSize);
		return dir;
	}

 	Mover.prototype.checkEage = function() {

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

 	Mover.prototype.render = function(p) {
	 	p.noStroke();
	 	p.fill(p.color(255, 122, 144, 0.8 * 255));
	 	p.ellipse(this.location.x,this.location.y,this.mass,this.mass);
 	}

 module.exports = Mover;

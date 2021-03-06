var Vector = require('./Vector');
var Ball = require('./Ball');
var Liquid = require('./Liquid');

var friction = function(p) {

	var liquid;
	var cycles = [];
	p.setup = function() {
		p.createCanvas(800,480);
	 	p.background(224);
		liquid = new Liquid(0, p.height/2, p.width, p.height/2, 1);
		for(var i = 0; i < 6; i++){
			cycles[i] = new Cycle(p.random(5,50),60 + i * 120,60);
		}
	}

	p.draw =  function() {
		p.background(224);
		liquid.display(p);
		for(var i = 0; i < 5; i++){
			cycles[i].update(liquid);
			cycles[i].render(p);
		}
	}

	function Cycle(m,x,y){
		Ball.call(this,m,x,y);
	}

	Cycle.prototype = new Ball();
	Cycle.prototype.update = function(liquid) {

		this.acceleration = new Vector(0,0);
		var gravity = new Vector(0,0.01*this.mass);
		this.applyForce(gravity);
		if(this.inside(liquid)){
			this.drag(liquid)
		}
		this.checkEage();
		this.velocity.add(this.acceleration);
		this.location.add(this.velocity);
	}
	Cycle.prototype.drag =  function(liquid) {
			var speed = this.velocity.mag();
			var drag = liquid.c * speed * speed;
			var dragForce = this.velocity.get();
			dragForce.normalize();
			dragForce.mult(-1);
			dragForce.mult(drag);
			this.applyForce(dragForce);
	}
	Cycle.prototype.inside = function(liquid){
		if(this.location.y >= liquid.y-this.mass/2){
			return true
		}
		return false;

	}
	Cycle.prototype.checkEage = function(){
		if(this.location.y >= p.height-this.mass/2){
			this.location.y = p.height - this.mass/2;
			this.velocity.mult(-1);
		}
	}
}

module.exports = friction;

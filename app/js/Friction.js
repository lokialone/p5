var Vector = require('./Vector');
var Ball = require('./Ball');
var Liquid = require('./Liquid');

var friction = function() {

	var liquid;
	var cycles = [];
	setup = function() {
		createCanvas(800,480);
	 	background(224);
		liquid = new Liquid(0, height/2, width, height/2, 0.1);
		for(var i = 0; i < 5; i++){
			cycles[i] = new Cycle(random(30,60),60 + i * 120,60,0,0.05);
		}

	}

	draw =  function() {
		background(224);
		liquid.display();

		for(var i = 0; i < 5; i++){
			cycles[i].update(liquid);
			cycles[i].render();
		}
	}

	function Cycle(m,x,y,ax,ay){
		Ball.call(this,m,x,y,ax,ay);
	}

	Cycle.prototype = new Ball();

	Cycle.prototype.update = function(liquid){

		if(this.checkEage()){

		}else{
			this.velocity.add(this.acceleration);
			this.location.add(this.velocity);
			this.inside(liquid);
		}


	}

	Cycle.prototype.drag =  function() {

	}

	Cycle.prototype.inside = function(liquid){
		if(this.location.y >= liquid.y-this.mass/2){
			return true
		}
		return false;

	}
	Cycle.prototype.checkEage = function(){
		if(this.location.y >= height-this.mass/2){
			this.velocity.y = -1 * this.velocity.y;
			console.log(this.velocity);
			return true
		}
		return false;

	}



}


module.exports = friction;

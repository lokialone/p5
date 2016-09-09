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
			cycles[i] = new Cycle(40,60 + i * 120,30,0,0.05);
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


	Cycle.prototype.inside = function(liquid){

		console.log(liquid.y);
		if(this.location.y >= liquid.y-this.mass/2){
			this.velocity.y -= liquid.c*this.velocity.y*this.velocity.y;
		}

	}
	Cycle.prototype.checkEage = function(){
		if(this.location.y >= height-this.mass/2){
			this.velocity.x = 0;
			this.velocity.y = 0;
			this.acceleration.y = 0;
			return true
		}
		return false;

	}



}



module.exports = friction;

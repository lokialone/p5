var Vector = require('./Vector');
var Ball = require('./Ball');
var Liquid = require('./Liquid');

var friction = function() {

	var liquid;
	var balls = [];
	setup = function() {
		createCanvas(800,480);
	 	background(224);
		liquid = new Liquid(0, height/2, width, height/2, 0.1);
		for(var i = 0; i < 5; i++){
			balls[i] = new Ball(40,60 + i * 120,30,0.2);
		}

	}

	draw =  function() {
		liquid.display();

		for(var i = 0; i < 5; i++){
			balls[i].render();
		}
	}

}



module.exports = friction;

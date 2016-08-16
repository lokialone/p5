var p5 = require('p5');

var sketch = function(p) {

	var canvasHeight = 480;
	var canvasWidth = 640;
	var ballNumber = 100;

	var self = this;
	self.balls = [];


	p.setup = function() {
		p.createCanvas(canvasWidth, canvasHeight); 
		p.noStroke();
		console.log(p);
		p.background(200);
		for(var i = 0; i < ballNumber; i++) {
			self.balls[i] = new Ball();
			console.log(self.balls[i]);
		}
	}

	p.draw = function() {
		p.background(200);
		for(var i = 0; i < balls.length; i++) {
			self.balls[i].run();
		}
	}

	function Ball() {
		this.x = Math.random() * canvasWidth;
		this.y = canvasHeight - 10;
		this.r = Math.random() * 10 + 10;
		this.v = Math.random();	
	}

	Ball.prototype.run = function(ball) {
		this.update();
		this.render();
	}

	Ball.prototype.update = function() {
		this.x = this.x + p.random(-1,1);
		this.y = this.y - this.v;
		if(this.y < 0){
			this.y = canvasHeight;
		}
	}

	Ball.prototype.render = function() {
		p.stroke(50);
		p.fill(100);
		p.ellipse(this.x,this.y,this.r,this.r);
	}
}

new p5(sketch);
var sketch = function() {

	var canvasHeight = 480;
	var canvasWidth = 640;
	var ballNumber = 100;
	var self = this;
	self.balls = [];

	setup = function() {
		createCanvas(canvasWidth, canvasHeight); 
		noStroke();
		background(255);
		for(var i = 0; i < ballNumber; i++) {
			self.balls[i] = new Ball();
		}
	}

	draw = function() {
		background(255);
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
		this.x = this.x + random(-1,1);
		this.y = this.y - this.v;
		if(this.y < 0){
			this.y = canvasHeight;
		}
	}

	Ball.prototype.render = function() {
		from = color(255, 0, 0, 0.2 * 255);
		to = color(0, 0, 255, 0.2 * 255);
		stroke(to);
		fill(from);
		ellipse(this.x,this.y,this.r,this.r);
	}
}

exports.sketch = sketch;
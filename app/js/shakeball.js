var canvasHeight = 480,
		canvasWidth = 640,
		ballNumber = 100,
		balls = [];

	function setup() {
		createCanvas(canvasWidth, canvasHeight); 
		noStroke();
		background(200);
		for(var i = 0; i < ballNumber; i++) {
			balls[i] = new Ball();
		}
	}
	
	function draw() {
		background(200);
		for(var i = 0; i < balls.length; i++) {
			balls[i].run();
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
		stroke(50);
		fill(100);
		ellipse(this.x,this.y,this.r,this.r);
	}
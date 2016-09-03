var Vector = function(x,y) {
	this.x = x;
	this.y = y;
	console.log('test');
}

Vector.prototype.add = function(vector) {
	// if(!vector.hasOwnProperty('x') && !vector.hasOwnProperty('y'){
	// 	return;
	// }
	this.x += vector.x;
	this.y += vector.y;
}

Vector.prototype.limit = function(speed) {

	this.x = Math.min(this.x,speed);
	this.y = Math.min(this.y,speed);
	
}

Vector.prototype.mag = function() {

	return sqrt(this.x * this.x + this.y * this.y);

}
Vector.prototype.normalize = function() {

	this.x = this.x / this.mag();
	this.y = this.y /this.mag();
}

Vector.prototype.mult = function(rate) {
	this.x = this.x * rate;
	this.y = this.y * rate;
}

Vector.prototype.sub = function(vector){

	return new Vector(this.x - vector.x,this.y - vector.y);

}

module.exports = Vector;
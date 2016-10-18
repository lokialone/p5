var Vector = function(x,y) {
	this.x = x;
	this.y = y;
}

//static function

Vector.dir = function(vector1,vector2) {
	return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
}
Vector.prototype.add = function(vector) {

	this.x += vector.x;
	this.y += vector.y;
}

Vector.prototype.limit = function(speed) {
	this.x = Math.min(this.x,speed);
	this.y = Math.min(this.y,speed);

}

Vector.prototype.get = function(){
	return new Vector(this.x,this.y);
}

Vector.prototype.mag = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y);
}

Vector.prototype.normalize = function() {
	this.x = this.x / this.mag();
	this.y = this.y / this.mag();
}

Vector.prototype.div = function(mass) {
	this.x = this.x / mass;
	this.y = this.y / mass;
}

Vector.prototype.mult = function(rate) {
	this.x = this.x * rate;
	this.y = this.y * rate;
}

Vector.prototype.sub =  function(vector) {
	this.x = this.x - vector.x;
	this.y = this.y - vector.y;
}

Vector.prototype.getSubObject = function(vector){
	return new Vector(this.x - vector.x,this.y - vector.y);
}

module.exports = Vector;

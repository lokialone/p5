var Liquid = function(x,y,w,h,c){

	this.x = x ;
	this.y = y ;
	this.w = w ;
	this.h = h ;
	this.c = c ;	

	this.display = function(){
		noStroke();
    	fill(175);
    	rect(this.x,this.y,this.w,this.h);
	}


}
// Liquid.prototype.display = function(){
// 	noStroke();
// 	fill(175);
// 	rect(this.x,this.y,this.w,this.h);
// 	console.log('s');
// }

module.exports = Liquid;
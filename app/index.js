var p5 = require('p5');
var shakeball = require('./js/shakeball');
var flock = require('./js/flock');
var ball = require('./js/bouncing');
var acceleration = require('./js/acceleration');
var freeFall = require('./js/freeFall');
var friction = require('./js/Friction');

// new p5(ball.bouncing);
// new p5(ball.vector_bouncing);
// new p5(acceleration.acceleration);
new p5(freeFall);
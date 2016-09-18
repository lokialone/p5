var p5 = require('p5');
var shakeball = require('./js/shakeball');
var flock = require('./js/flock');
var ball = require('./js/bouncing');
var acceleration = require('./js/acceleration');
var freeFall = require('./js/freeFall');
var friction = require('./js/Friction');
var Gravitation = require('./js/Gravitation');
var Attract = require('./js/Attract');
// new p5(ball.bouncing);
// new p5(ball.vector_bouncing);
// new p5(acceleration.acceleration);
// new p5(freeFall);
// new p5(friction);
// new p5(Gravitation);
// new p5(Attract);

var wawa = {};
wawa.Router = function(){
  function Router(){
  }
  Router.prototype.setup = function(routemap, defaultFunc){
    var that = this, rule, func;
    this.routemap = [];
    this.defaultFunc = defaultFunc;
    for (var rule in routemap) {
      if (!routemap.hasOwnProperty(rule)) continue;
      that.routemap.push({
        rule: new RegExp(rule, 'i'),
        func: routemap[rule]
      });
    }
  };
  Router.prototype.start = function(){
    console.log(window.location.hash);
    var hash = location.hash, route, matchResult;
    for (var routeIndex in this.routemap){
      route = this.routemap[routeIndex];
      matchResult = hash.match(route.rule);
      if (matchResult){
        route.func.apply(window, matchResult.slice(1));
        return;
      }
    }
    this.defaultFunc();
  };
  return Router;
}();
var router = new wawa.Router();
router.setup({
  '#/list': function(){
      new p5(Attract);
      console.log('he');
    },
  '#/show': function(){
      new p5(Gravitation);
    }
}, function(){
  console.log('default router');
});
router.start();

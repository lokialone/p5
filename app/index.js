var Router = require('./route');
var p5 = require('p5');
var shakeball = require('./js/shakeball');
var flock = require('./js/flock');
var ball = require('./js/bouncing');
var acceleration = require('./js/acceleration');
var freeFall = require('./js/freeFall');
var friction = require('./js/Friction');
var Gravitation = require('./js/Gravitation');
var Attract = require('./js/Attract');

var Router = function(){
    this.defaultFunc= {};
    this.routemap = [];
};

Function.prototype.bind= function(context){
  var self = this;
  return function(){
    return self.apply(context,arguments)
  }
}
Router.prototype.setup = function(routemap, defaultFunc){
  var rule, func;
  this.defaultFunc = defaultFunc;
  for (var rule in routemap) {
    if (!routemap.hasOwnProperty(rule)) continue;
    this.routemap.push({
      rule: new RegExp(rule, 'i'),
      func: routemap[rule]
    });
  }
  window.addEventListener('hashchange', this.start.bind(this));
  window.addEventListener('load', this.start.bind(this));
};
Router.prototype.start = function(){
  var hash = location.hash, route, matchResult;
  for (var routeIndex in this.routemap){
    route = this.routemap[routeIndex];
    matchResult = hash.match(route.rule);
    if (matchResult){
      route.func.apply(p5, matchResult.slice(1));
      return;
    }
  }
  this.defaultFunc;
};

var router = new Router();
router.setup({
  '#/Attract': function(){
    new p5(Attract);
    },
  '#/Gravitation': function(){
     new p5(Gravitation);
    },
  '#/Friction': function(){
      new p5(friction);
  }
}, function(){
  new p5(Attract);
});

// todo
// 使用单例模式生成函数
var p5Instance = function() {
  this.instance = null;
}

p5Instance.init = function(sketch) {

}

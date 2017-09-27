import Router from "./route";
var p5 = require('p5');
var shakeball = require('./js/shakeball');
var flock = require('./js/flock');
var ball = require('./js/bouncing');
var acceleration = require('./js/acceleration');
var freeFall = require('./js/freeFall');
var friction = require('./js/Friction');
var Gravitation = require('./js/Gravitation');
var Attract = require('./js/Attract');
var Rotate = require('./js/Rotate');
var TankGame =  require('./js/TankGame');
var router = new Router();
router.setup({
  '#/Attract': function(){
      p5Instance.init(Attract);
    },
  '#/Gravitation': function(){
      p5Instance.init(Gravitation);
    },
  '#/Friction': function(){
     p5Instance.init(friction);
  },
  '#/Rotate': function() {
    p5Instance.init(Rotate);
  },
  '#/TankGame': function() {
    p5Instance.init(TankGame);
  }
}, function(){
    p5Instance.init(Attract);
});

// 使用单例模式生成函数
var p5Instance = function() {
  this.instance = null;
}

p5Instance.init = function(sketch) {
  if(!this.instance) {
    this.instance = new p5(sketch);
  }else{
    this.instance.remove();
    this.instance = new p5(sketch);
  }
}

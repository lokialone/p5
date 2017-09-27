import p5 from 'p5';
import Router from "./route";
// import './style/commom.scss';

import shakeball from './js/shakeball';
import flock from './js/flock';
import ball from './js/bouncing';
import acceleration from './js/acceleration';
import freeFall from './js/freeFall';
import friction from './js/Friction';
import Gravitation from './js/Gravitation';
import Attract from './js/Attract';
import Rotate from './js/Rotate';
import TankGame from './js/TankGame';

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

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
      route.func.apply(window, matchResult.slice(1));
      return;
    }
  }
  this.defaultFunc;
};
module.exports =  Router

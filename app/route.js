var Router = {
    routes: [],
    el:null,
    current:null,
    add: function (path, templateId, controller) {
        // Allow route(path, controller) for template less routes:
        if (typeof templateId === 'function') {
          controller = templateId;
          templateId = null;
        }
        this.routes[path] = {templateId: templateId, controller: controller}
        return this
      },
    router: function() {
      var url = location.hash.slice(1) || '/';
        // Get route by url:
        var route = this.routes[url];
        // Is it a route without template?
        if (route && !route.templateId) {
          // Just initiate controller:
          return route.controller ? new route.controller : null;
        }
        // Lazy load view element:
        el = el || document.getElementById('view');
        // Clear existing observer:
        if (current) {
          Object.unobserve(current.controller, current.render);
          current = null;
        }
        // Do we have both a view and a route?
        if (el && route && route.controller) {
          // Set current route information:
          current = {
            controller: new route.controller,
            render: function () {
              // Render route template with John Resig's template engine:
              el.innerHTML = this.template(this.controller);
            }
          };
          // Render directly:
          current.render();
          // And observe for changes:
          Object.observe(current.controller, current.render.bind(current));
        }
    },
    listen: function() {
      // Listen on hash change:
     window.addEventListener('hashchange', this.router);
     // Listen on page load:
     window.addEventListener('load', this.router);
    }
}


module.exports =  Router

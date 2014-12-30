/*jshint loopfunc: true */

/*
  Application route handler
*/

(function (m, app) {

  // URL handling method
  m.route.mode = app.routingStrategy;

  // Building routes
  var routes = {};

  for (var module in app.modules) {
    // Secure module handling (still sort of WIP)
    if (app.AuthorizationCheck && app.modules[module].secured) {
      var oldInstance = app.modules[module].instance;

      app.modules[module].instance.view = function (controller) {
        if (!app.AuthorizationCheck.check()) {
          m.startComputation();

          m.route(app.AuthorizationCheck.loginPath);

          setTimeout(function () { m.endComputation(); }, 100); /* not sure about the length of this timeout */
        } else {
          return oldInstance.view(controller);
        }
      };
    }

    routes[app.modules[module].route] = app.modules[module].instance;
  }

  // Initialization
  m.route(app.container, app.defaultRoute, routes);

})(m, app);
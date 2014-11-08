(function (m, app) {

  // URL handling method
  m.route.mode = 'hash'; // needs .htaccess changes to use 'pathname'

  // Building routes
  var routes = {};

  for (var module in app.modules)
    routes[app.modules[module].route] = app.modules[module].instance;

  // Initialization
  m.route(app.container, app.defaultRoute, routes);

})(m, app);
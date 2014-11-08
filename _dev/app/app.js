// Declaring global variables
(function (window) {

  var document = window.document,
      app = {};

  app.container = document.getElementById('main');

  app.modules = {};

  app.module = function (name, instance, route) {
    if (!instance)
      return app.modules[name].instance;
    else
      app.modules[name] = { route : (route ? route : '/'), instance : instance };
  };

  app.defaultRoute = '/';

  window.app = app;

})(window);
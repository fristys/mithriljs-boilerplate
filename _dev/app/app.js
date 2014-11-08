// Declaring global variables
(function (window) {

  var document = window.document,
      app = {};

  // App basic config
  app.container = document.getElementById('main');
  app.defaultRoute = '/';

  // Modules storage
  app.modules = {};

  app.module = function (name, instance, route) {
    if (!instance)
      return (app.modules[name] ? app.modules[name].instance : undefined);
    else
      app.modules[name] = { route : (route ? route : '/'), instance : instance };
  };

  // Models storage
  app.models = {};

  app.model = function (name, instance) {
    if (!instance)
      return (app.models[name] ? app.models[name] : undefined);
    else
      app.models[name] = instance;
  };

  // Globalizing the ordeal
  window.app = app;

})(window);
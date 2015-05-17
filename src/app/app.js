/*
  [App name]
  powered by Mithril JS and Mithril JS Boilerplate (by Fristys)
*/

(function (window, m) {
  var document = window.document;

  /**
   * Global Application namespace
   * @type {Object}
   */
  var app = {};

  app.BPversion = 1.0;

  /**
   * App basic config parameters. Change at your leisure. [START]
   */

  /**
   * The application container. The App will get rendered here
   * @type {Object}
   */
  app.container = document.getElementById('main');

  /**
   * The routing strategy used by the application. Refer to MithrilJS docs for further info
   * @type {String}
   */
  app.routingStrategy = 'hash';

  /**
   * The default application route. The App will load the module associated
   * with this route first.
   * @type {String}
   */
  app.defaultRoute = '/';

  /**
   * Security check Model
   *
   *   Used for sercure modules in the app that might require the user to be logged in
   *   or something of that similar nature.
   *
   *   Feel free to comment out the next block of code if you
   *   don't need such a check in your app.
   *
   *   If you do need it, make sure to fill in your checkup function
   *   in the Authorization model below.
   *
   * @type {Object}
   */
  app.AuthorizationCheck = {
    loginPath : '/',
    check : function () {
      // Return either true or false in this function
      // True would allow the user to see the protected module
      // false will redirect them to AuthorizationCheck.loginPath
      return true;
    }
  };

  /**
   * App basic config parameters. Change at your leisure. [END]
   */

  /**
   * Modules storage
   * @type {Object}
   */
  app.modules = {};

  /**
   * Declares an application module / Returns an instance of an application module
   * @param  {String} name     The name of the module
   * @param  {Object} instance The instance of the module you want to store (usually just {})
   * @param  {String} route    The route you want this module to be rendered in (Default : '/')
   * @param  {Boolean} secured  Whether you want this module to have a security check or not (refer to the code after app.models' declaration)
   * @return {Object}          The module instance
   */
  app.module = function (name, instance, route, secured) {
    if (!instance)
      return (app.modules[name] ? app.modules[name].instance : undefined);
    else
      app.modules[name] = { route : (route ? route : '/'), instance : instance, secured : secured };
  };

  /**
   * Models storage
   * @type {Object}
   */
  app.models = {};

  /**
   * Declares / Accesses a model that's stored in the app namespace.
   * @param  {String} name     The name of the model
   * @param  {Object} instance The instance to store in this model
   * @return {Object}          The model instance
   */
  app.model = function (name, instance) {
    if (!instance)
      return app.models[name];
    else
      app.models[name] = instance;
  };

  /**
   * Components storage
   * @type {Object}
   */
  app.components = {};

  /**
   * Declares / Retrieves a component that's stored in the app namespace.
   * @param  {String} name      The component name
   * @param  {Object} container The container you want this component rendered in (leave null if you just want to store it)
   * @param  {Object} instance  The instance of the component you want stored (remember to have a controller and view properties defined here)
   * @return {Object}           The component instance
   */
  app.component = function (name, container, instance) {
    if (!container && !instance)
      return app.components[name];

    if (instance)
      app.components[name] = instance;

    if (app.components[name] && container)
      m.module((container == app.container ? document.body : container), app.components[name]);
  };

  /**
   * Global app namespace access
   * @type {Object}
   */
  window.app = app;

})(window, m);
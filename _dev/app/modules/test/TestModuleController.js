(function (m, app) {

  // Controller
  app.module('TestModule').controller = function () {
    this.test = m.prop('<span style="color: red;">Hello World</span>');
  };

})(m, app);
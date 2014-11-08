(function (m, app) {

  // View
  app.module('TestModule2').view = function (controller) {
    return m('div', [
        m('h2', controller.quote().text),
        m('p', [
          m('small', '- ' + controller.quote().author)
        ]),
        m('button', {
                      onclick : function (e) {
                                  e.preventDefault();
                                  controller.randomQuote();
                                }
        }, 'Random quote')
      ]);
  };

})(m, app);
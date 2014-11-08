(function (m, app) {

  // View
  app.module('TestModule').view = function (controller) {
    return m('div', [
        m('h2', controller.test()),
        m('h2.unfiltered', m.trust(controller.test())),
        m('input[type="text"]', {
                                  placeholder : 'Change the H2 text (the second h2 is unfiltered and allows HTML)...',
                                  onkeyup : function () {
                                              controller.test(this.value);
                                            }
                                })
      ]);
  };

})(m, app);
(function (m, app) {

  // View
  app.module('TestModule').view = function (controller) {
    return {tag: "div", attrs: {}, children: [
            {tag: "h2", attrs: {}, children: [controller.test()]}, 

            {tag: "h2", attrs: {className:"unfiltered"}, children: [
              m.trust(controller.test())
            ]}, 

            {tag: "input", attrs: {
              type:"text", 
              placeholder:"Change the H2 text (the second h2 is unfiltered and allows HTML)...", 
              value:controller.test(), 
              onkeyup:function () {
                        controller.test(this.value);
                       }}}
          ]};
  };

})(m, app);
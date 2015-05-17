(function (m, app) {

  // View
  app.module('TestModule2').view = function (controller) {
    return {tag: "div", attrs: {}, children: [
            {tag: "h2", attrs: {}, children: [controller.quote().text]}, 

            {tag: "p", attrs: {}, children: [
              {tag: "small", attrs: {}, children: ['- ' + controller.quote().author]}
            ]}, 

            {tag: "button", attrs: {onclick:function (e) {
             e.preventDefault();
             controller.randomQuote();
            }}, children: [
              "Random Quote"
            ]}
           ]};
  };

})(m, app);
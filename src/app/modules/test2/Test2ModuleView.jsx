(function (m, app) {

  // View
  app.module('TestModule2').view = function (controller) {
    return <div>
            <h2>{controller.quote().text}</h2>

            <p>
              <small>{'- ' + controller.quote().author}</small>
            </p>

            <button onclick={function (e) {
             e.preventDefault();
             controller.randomQuote();
            }}>
              Random Quote
            </button>
           </div>;
  };

})(m, app);
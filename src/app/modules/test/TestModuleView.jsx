(function (m, app) {

  // View
  app.module('TestModule').view = function (controller) {
    return <div>
            <h2>{controller.test()}</h2>

            <h2 className='unfiltered'>
              {m.trust(controller.test())}
            </h2>

            <input
              type="text"
              placeholder="Change the H2 text (the second h2 is unfiltered and allows HTML)..."
              value={controller.test()}
              onkeyup={function () {
                        controller.test(this.value);
                       }} />
          </div>;
  };

})(m, app);
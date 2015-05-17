(function (m, app) {

  // Controller
  app.module('TestModule2').controller = function () {
    var self = this;

    this.quote = m.prop({});
    this.quotes = m.prop([{
      text : '“Train yourself to let go of everything you fear to lose.”',
      author : 'Yoda'
    },
    {
      text : '“Death is a natural part of life. Rejoice for those around you who transform into the Force. Mourn them do not. Miss them do not.' +
              ' Attachment leads to jealously. The shadow of greed, that is.”',
      author : 'Yoda'
    },
    {
      text : '“The more you like yourself, the less you are like anyone else, which makes you unique.”',
      author : 'Walt Disney'
    },
    {
      text : '“The only true wisdom is in knowing you know nothing.”',
      author : 'Socrates'
    },
    {
      text : '“When it is obvious that the goals cannot be reached, don\'t adjust the goals, adjust the action steps.”',
      author : 'Confucius'
    }]);

    this.randomQuote = function () {
      self.quote(self.quotes()[Math.floor(Math.random() * self.quotes().length)]);
    };

    this.randomQuote();
  };

})(m, app);
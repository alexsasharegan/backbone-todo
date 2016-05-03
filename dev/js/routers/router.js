var app = app || {};

(function() {
  'use strict';

  var TodoRouter = Backbone.Router.extend({
    routes: {
      '*filter': 'setFilter'
    },
    setFilter: function (param) {
      app.TodoFilter = param || '';
      app.TodoCollection.trigger('filter');
    }
  });

  app.Router = new TodoRouter();
  Backbone.history.start();

}());

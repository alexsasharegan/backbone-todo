'use strict';

var app = app || {};

(function () {
  'use strict';

  var TodoCollection = Backbone.Collection.extend({
    url: '/todos',
    model: app.Todo,
    getCompleted: function getCompleted() {
      return this.where({ completed: true });
    },
    getActive: function getActive() {
      return this.where({ completed: false });
    },
    nextOrder: function nextOrder() {
      return this.length ? this.last().get('order') + 1 : 1;
    },
    comparator: 'order'
  });

  // attach the collection instance to the global namespace
  app.TodoCollection = new TodoCollection();
})();
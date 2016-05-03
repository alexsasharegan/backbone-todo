var app = app || {};

(function() {
  'use strict';

  var TodoCollection = Backbone.Collection.extend({
    url: '/todos',
    model: app.Todo,
    getCompleted: function () {
      return this.where({completed: true});
    },
    getActive: function () {
      return this.where({completed: false});
    },
		nextOrder: function () {
			return this.length ? this.last().get('order') + 1 : 1;
		},
		comparator: 'order'
  });

  // attach the collection instance to the global namespace
  app.TodoCollection = new TodoCollection();

}());

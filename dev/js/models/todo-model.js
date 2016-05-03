var app = app || {};

// immediately invoked function-expression
// only exports app to global namespace
(function() {
  'use strict';

  app.Todo = Backbone.Model.extend({
    defaults: {
      description: 'Enter your task here',
      completed: false
    },
    toggle: function () {
      this.save({completed: !this.get('completed')});
    }
  });

}());

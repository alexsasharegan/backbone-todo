'use strict';

var app = app || {};
app.model = app.model || {};

app.model.Todo = Backbone.Model.extend({
  defaults: {
    description: 'Enter your task here',
    completed: false
  },
  initialize: function initialize() {
    this.view = new app.view.TodoView({ model: this });
  },
  toggle: function toggle() {
    this.save({ completed: !this.get('completed') });
  }
});
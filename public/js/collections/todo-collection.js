'use strict';

var app = app || {};
app.collection = app.collection || {};

app.collection.TodoCollection = Backbone.Collection.extend({
  url: '/todos',
  model: app.model.Todo,
  getCompleted: function getCompleted() {
    return this.where({ completed: true });
  },
  getActive: function getActive() {
    return this.where({ completed: false });
  }
});
'use strict';

var Todo = Backbone.Model.extend({
  defaults: {
    description: 'Enter your task here',
    completed: false
  }
});

// initialize: function () {
//   //
// }
var Todos = Backbone.Collection.extend({
  url: '/todos',
  model: Todo
});

var TodoView = Backbone.View.extend({
  el: '#todo-container',
  tagName: 'li',
  className: 'list-group-item',
  template: _.template($('#new-todo-template').html())
});

$(function () {
  var todos = new Todos();
});
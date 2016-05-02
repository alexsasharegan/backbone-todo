'use strict';

var Todo = Backbone.Model.extend({
  defaults: {
    description: 'Enter your task here',
    completed: false
  },
  initialize: function initialize() {
    this.view = new TodoView({ model: this });
  }
});

var Todos = Backbone.Collection.extend({
  url: '/todos',
  model: Todo
});

var TodoView = Backbone.View.extend({
  el: '#todo-container',
  tagName: 'li',
  template: _.template($('#new-todo-template').html()),
  initialize: function initialize(options) {
    this.model = options.model;
    this.model.fetch();
    this.render();
    this.model.on('change', this.render);
  },
  render: function render() {
    console.log(this.model);
    var output = this.template({ description: this.model.get('description') });
    this.$el.prepend(output);
    return this;
  }
});

var todos = new Todos();
var $todoForm = $('#todo-form');
$todoForm.on('submit', function (e) {
  e.preventDefault();
  todos.create({ description: $todoForm.children('input').val() });
  $todoForm.children('input').val('');
});
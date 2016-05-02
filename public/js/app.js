'use strict';

var app = {};
app.view = {};
app.model = {};
app.collection = {};

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

app.collection.TodoCollection = Backbone.Collection.extend({
  url: '/todos',
  model: app.model.Todo,
  completed: function completed() {
    return this.where({ completed: true });
  },
  active: function active() {
    return this.where({ completed: false });
  }
});

app.view.TodoView = Backbone.View.extend({
  el: '#todo-container',
  tagName: 'li',
  template: _.template($('#new-todo-template').html()),
  events: {
    "click li.list-group-item": "toggleCompleted"
  },
  toggleCompleted: function toggleCompleted(e) {
    this.model.toggle();
  },
  initialize: function initialize(options) {
    this.model = options.model;
    this.model.fetch();
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
  },
  render: function render() {
    var output = this.template({ description: this.model.get('description') });
    this.$el.toggleClass('disabled', this.model.get('completed'));
    this.$el.prepend(output);
    return this;
  }
});

var todoList = new app.collection.TodoCollection();
var $todoForm = $('#todo-form');
$todoForm.on('submit', function (e) {
  console.log('before submit');
  e.preventDefault();
  console.log('after submit');
  todoList.create({ description: $todoForm.children('input').val() });
  $todoForm.children('input').val('');
});
var Todo = Backbone.Model.extend({
  defaults: {
    description: 'Enter your task here',
    completed: false
  },
  initialize: function () {
    this.view = new TodoView({model: this});
  },
  toggle: function () {
    this.save({completed: !this.get('completed')});
  }
});

var Todos = Backbone.Collection.extend({
  url: '/todos',
  model: Todo,
  completed: function () {
    return this.where({completed: true});
  },
  active: function () {
    return this.where({completed: false});
  }
});

var TodoView = Backbone.View.extend({
  el: '#todo-container',
  tagName: 'li',
  template: _.template($('#new-todo-template').html()),
  events: {
    "click li.list-group-item": "toggleCompleted"
  },
  toggleCompleted: function (e) {
    this.model.toggle();
  },
  initialize: function (options) {
    this.model = options.model;
    this.model.fetch();
    this.render();
    this.model.on('change', this.render);
  },
  render: function () {
    let output = this.template({description: this.model.get('description')});
    this.$el.prepend(output);
    return this;
  }
});

var todos = new Todos();
var $todoForm = $('#todo-form');
$todoForm.on('submit', function (e) {
  e.preventDefault();
  todos.create({description: $todoForm.children('input').val()});
  $todoForm.children('input').val('');
});

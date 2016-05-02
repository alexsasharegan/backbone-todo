// var app = {};
// app.view = {};
// app.model = {};
// app.collection = {};

// app.model.Todo = Backbone.Model.extend({
//   defaults: {
//     description: 'Enter your task here',
//     completed: false
//   },
//   initialize: function () {
//     this.view = new app.view.TodoView({model: this});
//   },
//   toggle: function () {
//     this.save({completed: !this.get('completed')});
//   }
// });
//
// app.collection.TodoCollection = Backbone.Collection.extend({
//   url: '/todos',
//   model: app.model.Todo,
//   completed: function () {
//     return this.where({completed: true});
//   },
//   active: function () {
//     return this.where({completed: false});
//   }
// });
//
// app.view.TodoView = Backbone.View.extend({
//   // el: '#todo-container',
//   tagName: 'li',
//   template: _.template($('#new-todo-template').html()),
//   events: {
//     "click li.list-group-item": "toggleCompleted"
//   },
//   toggleCompleted: function (e) {
//     this.model.toggle();
//   },
//   initialize: function (options) {
//     this.model = options.model;
//     this.model.fetch();
//     this.listenTo(this.model, 'change', this.render);
//     this.listenTo(this.model, 'destroy', this.remove);
//   },
//   render: function () {
//     let output = this.template({description: this.model.get('description')});
//     this.$el.toggleClass('disabled', this.model.get('completed'));
//     this.$el.prepend(output);
//     return this;
//   }
// });

$(function () {
  var todoList = new app.collection.TodoCollection();
  var $todoForm = $('#todo-form');
  $todoForm.on('submit', function (e) {
    e.preventDefault();
    todoList.create({description: $todoForm.children('input').val()});
    $todoForm.children('input').val('');
  });
});

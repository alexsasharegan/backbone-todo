var app = app || {};
app.model = app.model || {};

app.model.Todo = Backbone.Model.extend({
  defaults: {
    description: 'Enter your task here',
    completed: false
  },
  initialize: function () {
    this.view = new app.view.TodoView({model: this});
  },
  toggle: function () {
    this.save({completed: !this.get('completed')});
  }
});

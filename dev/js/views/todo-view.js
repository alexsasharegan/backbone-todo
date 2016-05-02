var app = app || {};
app.view = app.view || {};

app.view.TodoView = Backbone.View.extend({
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
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
  },
  render: function () {
    let output = this.template({description: this.model.get('description')});
    this.$el.toggleClass('disabled', this.model.get('completed'));
    this.$el.prepend(output);
    return this;
  }
});

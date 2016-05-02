var app = app || {};
app.collection = app.collection || {};

app.collection.TodoCollection = Backbone.Collection.extend({
  url: '/todos',
  model: app.model.Todo,
  getCompleted: function () {
    return this.where({completed: true});
  },
  getActive: function () {
    return this.where({completed: false});
  }
});

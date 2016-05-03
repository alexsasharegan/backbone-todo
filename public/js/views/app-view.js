'use strict';

var app = app || {};

(function () {
  'use strict';

  app.AppView = Backbone.View.extend({
    el: '.todo-app',
    events: {
      'keypress .new-todo': 'createOnEnter',
      'click .clear-completed': 'clearCompleted',
      'click .toggle-all': 'toggleAllComplete'
    },
    initialize: function initialize() {
      // this.allCheckbox = this.$('.toggle-all')[0];
      this.$input = this.$('.new-todo');
      // this.$footer = this.$('.footer');
      // this.$main = this.$('.main');
      this.$list = this.$('#todo-container');

      this.listenTo(app.todos, 'add', this.addOne);
      this.listenTo(app.todos, 'reset', this.addAll);
      this.listenTo(app.todos, 'change:completed', this.filterOne);
      this.listenTo(app.todos, 'filter', this.filterAll);
      this.listenTo(app.todos, 'all', _.debounce(this.render, 0));

      app.TodoCollection.fetch({ reset: true });
    },
    render: function render() {
      // var completed = app.todos.completed().length;
      // var remaining = app.todos.remaining().length;
      //
      // if (app.todos.length) {
      // 	this.$main.show();
      // 	this.$footer.show();
      //
      // 	this.$footer.html(this.statsTemplate({
      // 		completed: completed,
      // 		remaining: remaining
      // 	}));
      //
      // 	this.$('.filters li a')
      // 		.removeClass('selected')
      // 		.filter('[href="#/' + (app.TodoFilter || '') + '"]')
      // 		.addClass('selected');
      // } else {
      // 	this.$main.hide();
      // 	this.$footer.hide();
      // }
      //
      // this.allCheckbox.checked = !remaining;
    },
    createOnEnter: function createOnEnter(e) {
      if (e.which === ENTER_KEY && this.$input.val().trim()) {
        app.TodoCollection.create(this.newAttributes());
        this.$input.val('');
      }
    },
    newAttributes: function newAttributes() {
      return {
        description: this.$input.val().trim(),
        completed: false,
        order: app.TodoCollection.nextOrder()
      };
    },
    clearCompleted: function clearCompleted() {
      _.invoke(app.TodoCollection.getCompleted(), 'destroy');
      return false;
    },
    toggleAllComplete: function toggleAllComplete() {
      var completed = this.allCheckbox.checked;

      app.TodoCollection.each(function (todo) {
        todo.save({ completed: true });
      });
    },
    addOne: function addOne(todo) {
      var view = new app.TodoView({ todo: todo });
      this.$list.append(view.render().el);
    },
    addAll: function addAll() {
      this.$list.html('');
      app.TodoCollection.each(this.addOne, this);
    },
    filterOne: function filterOne(todo) {
      todo.trigger('visible');
    },
    filterAll: function filterAll() {
      app.TodoCollection.each(this.filterOne, this);
    }
  });
})(jQuery);
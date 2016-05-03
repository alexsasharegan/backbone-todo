var app = app || {};

(function() {
  'use strict';

  app.AppView = Backbone.View.extend({
    el: '.todo-app',
    events: {
      'keypress .new-todo': 'createOnEnter',
      'click .clear-completed': 'clearCompleted',
      'click .toggle-all': 'toggleAllComplete'
    },
    initialize: function () {
      // this.allCheckbox = this.$('.toggle-all')[0];
      this.$input = this.$('.new-todo');
      // this.$footer = this.$('.footer');
      // this.$main = this.$('.main');
      this.$list = this.$('#todo-container');

      this.listenTo(app.TodoCollection, 'add', this.addOne);
			this.listenTo(app.TodoCollection, 'reset', this.addAll);
			this.listenTo(app.TodoCollection, 'change:completed', this.filterOne);
			this.listenTo(app.TodoCollection, 'filter', this.filterAll);
			this.listenTo(app.TodoCollection, 'all', _.debounce(this.render, 0));

      app.TodoCollection.fetch({reset: true});
    },
    render: function () {
      // var completed = app.TodoCollection.completed().length;
			// var remaining = app.TodoCollection.remaining().length;
      //
			// if (app.TodoCollection.length) {
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
    createOnEnter: function (e) {
      if (e.which === ENTER_KEY && this.$input.val().trim()) {
        app.TodoCollection.create(this.newAttributes());
        this.$input.val('');
      }
    },
    newAttributes: function () {
      return {
        description: this.$input.val().trim(),
        completed: false,
        order: app.TodoCollection.nextOrder()
      };
    },
    clearCompleted: function () {
      _.invoke(app.TodoCollection.getCompleted(), 'destroy');
      return false;
    },
    toggleAllComplete: function () {
      var completed = this.allCheckbox.checked;

      app.TodoCollection.each(function (todo) {
        todo.save({completed: true});
      });
    },
    addOne: function (todo) {
      var view = new app.TodoView({model: todo});
      this.$list.append(view.render().el);
    },
    addAll: function () {
      this.$list.html('');
      app.TodoCollection.each(this.addOne, this);
    },
    filterOne: function (todo) {
      todo.trigger('visible');
    },
    filterAll: function () {
      app.TodoCollection.each(this.filterOne, this);
    }
  });

}(jQuery));

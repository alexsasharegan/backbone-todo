'use strict';

var app = app || {};

(function ($) {
  'use strict';

  app.TodoView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#new-todo-template').html()),
    events: {
      'click .toggle': 'toggleCompleted',
      'dblclick label': 'edit',
      'click .destroy': 'clear',
      'keypress .edit': 'updateOnEnter',
      'keydown .edit': 'revertOnEscape',
      'blur .edit': 'close'
    },
    initialize: function initialize(options) {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(this.model, 'visible', this.toggleVisible);
    },
    render: function render() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.toggleClass('completed', this.model.get('completed'));
      this.toggleVisible();
      this.$input = this.$('.edit');
      return this;
    },
    toggleCompleted: function toggleCompleted(e) {
      this.model.toggle();
    },
    edit: function edit() {
      this.$el.addClass('editing');
      this.$input.focus();
    },
    clear: function clear() {
      this.model.destroy();
    },
    updateOnEnter: function updateOnEnter(e) {
      if (e.which === ENTER_KEY) {
        this.close();
      }
    },
    revertOnEscape: function revertOnEscape(e) {
      if (e.which === ESC_KEY) {
        this.$el.removeClass('editing');
        this.$input.val(this.model.get('description'));
      }
    },
    close: function close() {
      var value = this.$input.val().trim();

      if (!this.$el.hasClass('editing')) {
        return;
      } else if (value) {
        this.model.save({ description: value });
      } else {
        this.clear();
      }

      this.$el.removeClass('editing');
    },
    isHidden: function isHidden() {
      return this.model.get('completed') ? app.TodoFilter === 'active' : app.TodoFilter === 'completed';
    },
    toggleVisible: function toggleVisible() {
      this.$el.toggleClass('hidden', this.isHidden());
    }
  });
})(jQuery);
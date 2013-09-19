define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/modal.html'
],

function ($, _, Backbone, template) {

    var ModalView = Backbone.View.extend({

        className: 'modal hide fade',
        template: _.template($(template).html()),

        events: {
            'click .close': 'close'
        },

        initialize: function (modal) {
            this.modal = modal;
        },

        render: function () {
            var self = this;

            require(['bootstrapModal'], function ($) {
                self.$el.attr('tabindex', -1).append(self.template(self.modal.toJSON())).modal(self.modal.get('options'));
            });

            return this;
        },

        close: function (e) {
            this.$el.modal('hide');
            e.preventDefault();
        }

    });

    return ModalView;

});
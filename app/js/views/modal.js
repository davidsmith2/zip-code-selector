define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/modal.html'
],

function ($, _, Backbone, template) {

    var ModalView = Backbone.View.extend({

        className: 'modal',
        template: _.template($(template).html()),

        events: {
            'click .close': 'close',
            'click .modal-cancel': 'close'
        },

        initialize: function (modal) {
            this.modal = modal;
        },

        render: function () {
            var self = this;

            require(['jquery', 'bootstrapModal'], function ($) {
                self.$el.append(self.template(self.modal.toJSON())).modal();
            });

            return this;
        },

        close: function (e) {
            e.preventDefault();
            this.$el.modal('hide');
        }

    });

    return ModalView;

});
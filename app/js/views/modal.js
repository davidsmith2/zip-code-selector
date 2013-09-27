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
            'click .close': 'close',
            'click .modal-cancel': 'close'
        },

        initialize: function (model) {
            this.model = model;
        },

        render: function () {
            var self = this;

            require(['bootstrapModal'], function ($) {
                self.$el
                    .attr('tabindex', -1)
                    .append(
                        self.template(
                            self.model.toJSON()
                            )
                        )
                    .modal(self.model.get('options'));
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
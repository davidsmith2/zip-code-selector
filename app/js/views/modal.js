define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/modal.html',
    'bootstrap'
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
            this.$el
                .attr('tabindex', -1)
                .append(
                    this.template(
                        this.model.toJSON()
                        )
                    )
                .modal(this.model.get('options'));

            return this;
        },

        close: function (e) {
            this.$el.modal('hide');
            e.preventDefault();
        }

    });

    return ModalView;

});
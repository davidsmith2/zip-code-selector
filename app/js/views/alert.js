define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'text!templates/alert.html',
    'bootstrap'
],

function ($, _, Backbone, config, template) {

    var AlertView = Backbone.View.extend({

        template: _.template($(template).html()),

        events: {
            'click .close': 'close'
        },

        initialize: function (model) {
            this.model = model;
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el
                .removeClass()
                .empty()
                .append(this
                    .template(
                        this.model
                            .toJSON()
                        )
                    )
                .alert();

            if (this.model.get('content')) {
                this.$el.addClass('alert');
            }
            if (this.model.get('connotation')) {
                this.$el.addClass('alert-' + this.model.get('connotation'));
            }
            if (this.model.get('block')) {
                this.$el.addClass('alert-block');
            }

            return this;
        },

        close: function () {
            this.$el.alert('close');
        }

    });

    return AlertView;

});
define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'text!templates/alert.html'
],

function ($, _, Backbone, config, template) {

    var AlertView = Backbone.View.extend({

        template: _.template($(template).html()),

        events: {
            'click .close': 'close'
        },

        initialize: function (alert) {
            this.alert = alert;
            this.listenTo(this.alert, 'change', this.render);
        },

        render: function () {
            var self = this;

            if (this.alert.get('content')) {
                this.$el.addClass('alert');
            }

            if (this.alert.get('connotation')) {
                this.$el.addClass('alert-' + this.alert.get('connotation'));
            }

            if (this.alert.get('block')) {
                this.$el.addClass('alert-block');
            }

            require(['bootstrapAlert'], function ($) {
                self.$el.empty().append(self.template(self.alert.toJSON())).alert();
            });

            return this;
        },

        close: function () {
            this.reset();
            this.$el.alert('close');
        },

        reset: function () {
            this.alert.set(this.alert.defaults);
        }

    });

    return AlertView;

});
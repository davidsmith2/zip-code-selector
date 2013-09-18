define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'text!templates/alert.html'
],

function ($, _, Backbone, config, template) {

    var AlertView = Backbone.View.extend({

        className: 'geographyZipCodesAlert',
        template: _.template($(template).html()),

        events: {
            'click .close': 'dismiss'
        },

        initialize: function (alert, search) {
            this.alert = alert;
            this.listenTo(this.alert, 'change', this.render);
            this.listenTo(search, 'change:zipCodeFile', this.reset);
        },

        render: function () {
            var self = this;

            require(['jquery', 'bootstrapAlert'], function ($) {
                self.$el.append(self.template(self.alert.toJSON()));
                self.$('.alert').alert();
            });

            return this;
        },

        reset: function () {
            this.alert.set(this.alert.defaults);
        },

        dismiss: function () {
            this.reset();
            this.$('.alert').alert('close');
        }

    });

    return AlertView;

});
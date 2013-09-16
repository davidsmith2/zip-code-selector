define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'text!templates/alert.html'
],

function ($, _, Backbone, config, template) {

    var AlertView = Backbone.View.extend({

        id: 'geographyZipCodesAlert',
        template: _.template($(template).html()),

        initialize: function (alert, search) {
            this.alert = alert;
            this.listenTo(this.alert, 'change', this.render);
            this.listenTo(search, 'change:zipCodeFile', this.reset);
        },

        render: function () {
            this.$el.empty().append(this.template(this.alert.toJSON()));
            return this;
        },

        reset: function () {
            this.alert.set(this.alert.defaults);
        }

    });

    return AlertView;

});
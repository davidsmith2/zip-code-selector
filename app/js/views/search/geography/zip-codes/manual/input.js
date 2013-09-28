define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/geography/zip-codes/manual/input.html'
],

function ($, _, Backbone, template) {

    var InputView = Backbone.View.extend({

        tagName: 'td',
        template: _.template($(template).html()),

        events: {},

        initialize: function (model) {
            this.model = model;
        },

        render: function () {
            this.$el.append(this.template(this.model));
            return this;
        }

    });

    return InputView;

});
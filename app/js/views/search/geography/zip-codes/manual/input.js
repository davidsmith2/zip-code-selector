define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/geography/zip-codes/manual/input.html'
],

function ($, _, Backbone, template) {

    var ManualInputView = Backbone.View.extend({

        tagName: 'span',
        template: _.template($(template).html()),

        events: {},

        initialize: function (input) {
            this.input = input;
        },

        render: function () {
            this.$el.append(this.template(this.input));
            return this;
        }

    });

    return ManualInputView;

});
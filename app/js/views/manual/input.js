define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/manual/input.html'
],

function ($, _, Backbone, template) {

    var ManualInputView = Backbone.View.extend({

        tagName: 'span',
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

    return ManualInputView;

});
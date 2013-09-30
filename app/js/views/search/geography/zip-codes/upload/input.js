define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/geography/zip-codes/upload/input.html'
],

function ($, _, Backbone, template) {

    var InputView = Backbone.View.extend({

        template: _.template($(template).html()),

        events: {},

        initialize: function (model) {
            this.model = model;
            this.listenTo(this.model, 'change:name', this.render);
        },

        render: function () {
            this.$el.empty().append(this.template(this.model.toJSON()));
            return this;
        }

    });

    return InputView;

});
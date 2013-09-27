define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/geography/zip-codes/upload/input.html'
],

function ($, _, Backbone, template) {

    var InputView = Backbone.View.extend({

        template: _.template($(template).html()),

        events: {
            'click .attach': 'attachFile',
            'click .detach': 'detachFile'
        },

        initialize: function (file) {
            this.file = file;
            this.listenTo(this.file, 'change:name', this.render);
        },

        render: function () {
            this.$el.empty().append(this.template(this.file.toJSON()));
            return this;
        },

        attachFile: function (e) {
            e.preventDefault();
            this.trigger('attach');
        },

        detachFile: function (e) {
            e.preventDefault();
            this.file.reset();
            this.trigger('detach');
        }

    });

    return InputView;

});
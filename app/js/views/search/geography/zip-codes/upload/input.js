define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/geography/zip-codes/upload/input.html'
],

function ($, _, Backbone, template) {

    var UploadInputView = Backbone.View.extend({

        template: _.template($(template).html()),

        events: {},

        initialize: function (file) {
            this.file = file;
            this.listenTo(this.file, 'change:name', this.render);
        },

        render: function () {
            this.$el.empty().append(this.template(this.file.toJSON()));
            return this;
        }

    });

    return UploadInputView;

});
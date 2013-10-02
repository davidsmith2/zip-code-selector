define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/geography/zip-codes/upload/help.html',
    'bootstrap'
],

function ($, _, Backbone, template) {

    var HelpView = Backbone.View.extend({

        className: 'modal hide fade',
        template: _.template($(template).html()),

        events: {
            'click .close': 'hideDialog'
        },

        render: function () {
            this.$el.attr('tabindex', -1).empty().append(this.template()).modal();
            return this;
        },

        hideDialog: function (e) {
            e.preventDefault();
            this.$el.modal('hide');
        }

    });

    return HelpView;

});
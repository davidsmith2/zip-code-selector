define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/save-search.html'
],

function ($, _, Backbone, template) {

    var SaveSearchView = Backbone.View.extend({

        className: 'modal hide fade',
        template: _.template($(template).html()),

        events: {
            'change input[type=text]':  'saveSearchName',
            'click .confirm':           'saveSearch',
            'click .cancel':            'hideDialog',
            'click .close':             'hideDialog'
        },

        initialize: function (search, searches) {
            this.search = search;
            this.searches = searches;
        },

        render: function () {
            var self = this;

            require(['bootstrapModal'], function ($) {
                self.$el
                    .attr('tabindex', -1)
                    .append(self.template(self.search.toJSON()))
                    .modal();
            });

            return this;
        },

        saveSearchName: function (e) {
            var name = $(e.target).val();

            if (name) {
                this.search.set('name', name);
            }
        },

        saveSearch: function (e) {
            e.preventDefault();
            this.$('.close').trigger('click');
            this.searches.add(this.search);
        },

        hideDialog: function (e) {
            e.preventDefault();
            this.$el.modal('hide');
        }

    });

    return SaveSearchView;

});
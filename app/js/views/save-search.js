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
            'change #name':             'saveName',
            'click #private':           'savePrivate',
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
                self.$el.attr('tabindex', -1).append(self.template(self.search.toJSON())).modal();
            });

            return this;
        },

        saveName: function (e) {
            var name = $(e.target).val();

            if (name) {
                this.search.set({
                    name: name
                });
            }
        },

        savePrivate: function (e) {
            this.search.set({
                _private: ($(e.target).is(':checked')) ? true : false
            });
        },

        saveSearch: function (e) {
            e.preventDefault();
            this.$('.close').trigger('click');
            if (this.search.isNew()) {
                this.searches.create(this.search);
            } else {
                this.search.save();
            }
        },

        hideDialog: function (e) {
            e.preventDefault();
            this.$el.modal('hide');
        }

    });

    return SaveSearchView;

});
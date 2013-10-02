define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/results/save.html',
    'bootstrap'
],

function ($, _, Backbone, template) {

    var SaveSearchView = Backbone.View.extend({

        className: 'modal hide fade',
        template: _.template($(template).html()),

        events: {
            'change #name': 'saveName',
            'click #private': 'savePrivate',
            'click .confirm': 'saveSearch',
            'click .cancel': 'hideDialog',
            'click .close': 'hideDialog'
        },

        initialize: function (model, collection) {
            this.model = model;
            this.collection = collection;
        },

        render: function () {
            this.$el.attr('tabindex', -1).empty().append(this.template(this.model.toJSON())).modal();
            return this;
        },

        saveName: function (e) {
            var name = $(e.target).val();

            if (name) {
                this.model.set({
                    name: name
                }, {
                    silent: true
                });
            }
        },

        savePrivate: function (e) {
            this.model.set({
                _private: ($(e.target).is(':checked')) ? true : false
            }, {
                silent: true
            });
        },

        saveSearch: function (e) {
            e.preventDefault();
            this.$('.close').trigger('click');
            if (this.model.isNew()) {
                this.collection.create(this.search);
            } else {
                this.model.save();
            }
        },

        hideDialog: function (e) {
            e.preventDefault();
            this.$el.modal('hide');
        }

    });

    return SaveSearchView;

});
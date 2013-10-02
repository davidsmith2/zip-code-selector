define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'views/search/results/save',
    'text!templates/search/results/summary.html',
    'bootstrap'
],

function ($, _, Backbone, config, SaveSearchView, template) {

    var SearchResultsView = Backbone.View.extend({

        id: 'searchResults',
        template: _.template($(template).html()),

        events: {
            'click .modal-show': 'showModal',
            'click .dropdown-menu': 'persistDropdown'
        },

        initialize: function (model, collection) {
            this.model = model;
            this.collection = collection;
        },

        render: function () {
            this.$el.empty().append(this.template(this.model.toJSON()));
            this.$('.dropdown-toggle').dropdown();
            return this;
        },

        showModal: function (e) {
            e.preventDefault();
            $('.modalContainer').html(new SaveSearchView(this.model, this.collection).render().el);
        },

        persistDropdown: function (e) {
            e.stopPropagation();
        }

    });

    return SearchResultsView;

});
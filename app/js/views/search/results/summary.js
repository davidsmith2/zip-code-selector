define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'views/search/results/save',
    'text!templates/search/results/summary.html'
],

function ($, _, Backbone, config, SaveSearchView, template) {

    var SearchResultsView = Backbone.View.extend({

        id: 'searchResults',
        template: _.template($(template).html()),

        events: {
            'click .open': 'showDialog'
        },

        initialize: function (search, searches) {
            this.search = search;
            this.searches = searches;
        },

        render: function () {
            this.$el.empty().append(this.template(this.search.toJSON()));
            return this;
        },

        showDialog: function (e) {
            e.preventDefault();
            $('.modalContainer').html(new SaveSearchView(this.search, this.searches).render().el);
        }

    });

    return SearchResultsView;

});
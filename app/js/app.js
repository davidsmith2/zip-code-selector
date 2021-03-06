define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'collections/searches',
    'collections/students',
    'models/search',
    'views/search/geography/zip-codes',
    'views/search/geography/selections',
    'views/search/results/summary'
],

function ($, _, Backbone, config, Searches, Students, Search, ZipCodesView, SelectionsView, SearchResultsView) {

    var App = function () {

        // collections
        this.collections.students = new Students();
        this.collections.searches = new Searches();

        // models
        this.models.search = new Search();

        // views
        this.views.zipCodes = new ZipCodesView(this.models.search);
        this.views.selections = new SelectionsView(this.models.search);
        this.views.searchResults = new SearchResultsView(this.models.search, this.collections.searches);

        // populate collections and define callbacks
        this.collections.students.add(config.students);
        this.collections.searches.once('sync', this.showSearchResultsView, this).fetch({reset: true});

        this.models.search.on('change sync', this.updateSearchResultsView, this);

        // render initial views
        $('#geographyZipCodesContainer').replaceWith(this.views.zipCodes.render().el);
        $('#geographySelectionsContainer').replaceWith(this.views.selections.render().el);

    };

    App.prototype = {

        collections: {},
        models: {},
        views: {},

        showSearchResultsView: function () {
            $('#searchResultsContainer').replaceWith(this.views.searchResults.render().el);
        },

        updateSearchResultsView: function () {
            var searchResults = this.getSearchResults();

            this.models.search.set({
                resultsCount: searchResults.length,
                resultsPercent: (searchResults.length / this.collections.students.length) * 100
            });
            this.views.searchResults.render();
        },

        getSearchResults: function () {
            var results = [],
                self = this;

            _.each(this.models.search.get('zipCodes'), function (zipCode) {
                results.push(self.collections.students.where({zipCode: zipCode}));
            });

            return _.flatten(results);
        },

    };

    return App;

});
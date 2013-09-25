define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'collections/searches',
    'collections/students',
    'collections/uploads',
    'models/search',
    'views/search/geography/zip-codes',
    'views/search/geography/selections',
    'views/search/results/view'
],

function ($, _, Backbone, config, Searches, Students, Uploads, Search, ZipCodesView, SelectionsView, SearchResultsView) {

    var App = function () {

        // collections
        this.collections.students = new Students();
        this.collections.searches = new Searches();
        this.collections.uploads = new Uploads();

        // models
        this.models.search = new Search();

        // views
        this.views.zipCodes = new ZipCodesView(this.models.search, this.collections.uploads);
        this.views.selections = new SelectionsView(this.models.search);
        this.views.searchResults = new SearchResultsView(this.models.search, this.collections.searches, this.collections.students);

        // populate collections and define callbacks
        this.collections.students.add(config.students);
        this.collections.searches.once('sync', this.showSearchResultsView, this).fetch({reset: true});
        this.collections.uploads.once('sync', this.showZipCodesView, this).fetch({reset: true});

        // render initial views
        $('#geographySelectionsContainer').replaceWith(this.views.selections.render().el);

    };

    App.prototype = {
        collections: {},
        models: {},
        views: {},
        showZipCodesView: function () {
            $('#geographyZipCodesContainer').replaceWith(this.views.zipCodes.render().el);
        },
        showSearchResultsView: function () {
            $('#searchResultsContainer').replaceWith(this.views.searchResults.render().el);
        }
    };

    return App;

});
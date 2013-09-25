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
        this.views.zipCodesView = new ZipCodesView(this.models.search, this.collections.uploads);
        this.views.selectionsView = new SelectionsView(this.models.search);
        this.views.searchResultsView = new SearchResultsView(this.models.search, this.collections.students, this.collections.searches);

        // populate collections and define callbacks
        this.collections.students.add(config.students);
        this.collections.searches.on('sync', this.showSearchResultsView, this).fetch({reset: true});
        this.collections.uploads.on('sync', this.showZipCodesView, this).fetch({reset: true});

        // render initial views
        $('#geographySelectionsContainer').replaceWith(this.views.selectionsView.render().el);

    };

    App.prototype = {
        collections: {},
        models: {},
        views: {},
        showZipCodesView: function () {
            $('#geographyZipCodesContainer').replaceWith(this.views.zipCodesView.render().el);
        },
        showSearchResultsView: function () {
            $('#searchResultsContainer').replaceWith(this.views.searchResultsView.render().el);
        }
    };

    return App;

});
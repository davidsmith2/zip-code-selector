define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'models/alert',
    'models/search',
    'collections/searches',
    'collections/students',
    'collections/uploads',
    'views/search/results/view',
    'views/search/geography/selections',
    'views/search/geography/zip-codes/upload/form',
    'views/search/geography/zip-codes/manual/form'
],

function ($, _, Backbone, config, Alert, Search, Searches, Students, Uploads, SearchResultsView, SelectionsView, UploadView, ManualView) {

    var App = function () {

        // collections
        this.collections.students = new Students();
        this.collections.searches = new Searches();
        this.collections.uploads = new Uploads();

        // models
        this.models.search = new Search();

        // views
        this.views.uploadView = new UploadView(this.collections.uploads, this.models.search, new Alert());
        this.views.manualView = new ManualView(this.models.search, new Alert());
        this.views.searchResultsView = new SearchResultsView(this.models.search, this.collections.students, this.collections.searches);
        this.views.selectionsView = new SelectionsView(this.models.search);

        // populate collections and define callbacks
        this.collections.students.add(config.students);
        this.collections.searches.on('sync', this.showSearchResultsView, this).fetch({reset: true});
        this.collections.uploads.on('sync', this.showUploadView, this).fetch({reset: true});

        // render initial views
        $('#geographyZipCodesManualContainer').replaceWith(this.views.manualView.render().el);
        $('#geographySelectionsContainer').replaceWith(this.views.selectionsView.render().el);

        console.log(this);
    };

    App.prototype = {
        collections: {},
        models: {},
        views: {},
        showUploadView: function () {
            $('#geographyZipCodesUploadContainer').replaceWith(this.views.uploadView.render().el);
        },
        showSearchResultsView: function () {
            $('#searchResultsContainer').replaceWith(this.views.searchResultsView.render().el);
        }
    };

    return App;

});
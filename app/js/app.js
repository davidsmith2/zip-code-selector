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
    'views/manual',
    'views/search-results',
    'views/selections',
    'views/upload'
],

function ($, _, Backbone, config, Alert, Search, Searches, Students, Uploads, ManualView, SearchResultsView, SelectionsView, UploadView) {

    var App = function () {

        this.collections.students = new Students();
        this.collections.students.add(config.students);

        this.collections.searches = new Searches();
        this.collections.searches.on('sync', this.showSearchResultsView, this).fetch({reset: true});

        this.collections.uploads = new Uploads();
        this.collections.uploads.on('sync', this.showUploadView, this).fetch({reset: true});

        this.models.search = new Search();

        $('#geographyZipCodesManualContainer').replaceWith(new ManualView(this.models.search, new Alert()).render().el);
        $('#geographySelectionsContainer').replaceWith(new SelectionsView(this.models.search).render().el);
    };

    App.prototype = {
        models: {},
        collections: {},
        views: {},

        showUploadView: function () {
            $('#geographyZipCodesUploadContainer').replaceWith(new UploadView(this.collections.uploads, this.models.search, new Alert()).render().el);
        },

        showSearchResultsView: function () {
            $('#searchResultsContainer').replaceWith(new SearchResultsView(this.models.search, this.collections.students, this.collections.searches).render().el);
        }

    };

    return App;

});
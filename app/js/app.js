define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'models/alert',
    'models/search',
    'collections/students',
    'collections/uploads',
    'views/alert',
    'views/manual',
    'views/search-results',
    'views/selections',
    'views/upload'
],

function ($, _, Backbone, config, Alert, Search, Students, Uploads, AlertView, ManualView, SearchResultsView, SelectionsView, UploadView) {

    var App = function () {
        var self = this;

        this.collections.students = new Students();
        this.collections.students.add(config.students);

        this.models.search = new Search();

        this.models.alert = new Alert();

        this.collections.uploads = new Uploads();
        this.collections.uploads.on('sync', this.showUploadView, this).fetch({reset: true});

        $('#searchResultsContainer').replaceWith(new SearchResultsView(this.models.search, this.collections.students).render().el);
        $('#geographyZipCodesAlertContainer').replaceWith(new AlertView(this.models.alert, this.models.search).render().el);
        $('#geographyZipCodesManualContainer').replaceWith(new ManualView(self.models.search).render().el);
        $('#geographySelectionsContainer').replaceWith(new SelectionsView(self.models.search).render().el);
    };

    App.prototype = {
        models: {},
        collections: {},
        views: {},

        showUploadView: function () {
            $('#geographyZipCodesUploadContainer').replaceWith(new UploadView(this.collections.uploads, this.models.search).render().el);
        }

    };

    return App;

});
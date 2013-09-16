define([
    'jquery',
    'underscore',
    'backbone',
    'models/alert',
    'models/search',
    'collections/uploads',
    'views/alert',
    'views/manual',
    'views/selections',
    'views/upload'
],

function ($, _, Backbone, Alert, Search, Uploads, AlertView, ManualView, SelectionsView, UploadView) {

    var App = function () {

        var self = this;

        this.collections.uploads = new Uploads();

        this.models.search = new Search();
        this.models.alert = new Alert();

        this.collections.uploads.fetch({reset: true});
        this.collections.uploads.on('sync', function () {
            $('#geographyZipCodesUploadContainer').replaceWith(new UploadView(self.collections.uploads, self.models.search).render().el);
            $('#geographyZipCodesAlertContainer').replaceWith(new AlertView(self.models.alert, self.models.search).render().el);
            $('#geographyZipCodesManualContainer').replaceWith(new ManualView(self.models.search).render().el);
            $('#geographySelectionsContainer').replaceWith(new SelectionsView(self.models.search).render().el);
        });

    };

    App.prototype = {
        models: {},
        collections: {},
        views: {}
    };

    return App;

});
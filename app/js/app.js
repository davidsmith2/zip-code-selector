define([
    'jquery',
    'underscore',
    'backbone',
    'models/alert',
    'models/file',
    'models/selection',
    'collections/uploads',
    'collections/zip-codes',
    'views/alert',
    'views/manual',
    'views/selections',
    'views/upload'
],

function ($, _, Backbone, Alert, File, Selection, Uploads, ZipCodes, AlertView, ManualView, SelectionsView, UploadView) {

    var App = function () {

        var self = this;

        this.collections.uploads = new Uploads();
        this.collections.zipCodes = new ZipCodes();

        this.models.selection = new Selection();
        this.models.zipCodeFile = new File();
        this.models.alert = new Alert();

        this.views.alert = new AlertView(this.models.alert, this.models.selection);

        this.collections.uploads.fetch({reset: true});
        this.collections.uploads.on('sync', function () {
            $('#geographyZipCodesUploadContainer').replaceWith(new UploadView(self.models.zipCodeFile, self.collections.uploads).render().el);
            $('#geographyZipCodesAlertContainer').replaceWith(self.views.alert.el);
            $('#geographyZipCodesManualContainer').replaceWith(new ManualView(self.collections.zipCodes).render().el);
            $('#geographySelectionsContainer').replaceWith(new SelectionsView(self.models, self.collections).render().el);
        });

    };

    App.prototype = {
        models: {},
        collections: {},
        views: {}
    };

    return App;

});
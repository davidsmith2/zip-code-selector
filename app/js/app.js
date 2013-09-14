define([
    'jquery',
    'underscore',
    'backbone',
    'models/alert',
    'models/selection',
    'collections/uploads',
    'views/alert',
    'views/manual',
    'views/selections',
    'views/upload'
],

function ($, _, Backbone, Alert, Selection, Uploads, AlertView, ManualView, SelectionsView, UploadView) {

    var App = function () {

        var self = this;

        this.collections.uploads = new Uploads();

        this.models.selection = new Selection();
        this.models.alert = new Alert();

        this.collections.uploads.fetch({reset: true});
        this.collections.uploads.on('sync', function () {
            $('#geographyZipCodesUploadContainer').replaceWith(new UploadView(self.collections.uploads, self.models.selection).render().el);
            $('#geographyZipCodesAlertContainer').replaceWith(new AlertView(self.models.alert, self.models.selection).render().el);
            $('#geographyZipCodesManualContainer').replaceWith(new ManualView(self.models.selection).render().el);
            $('#geographySelectionsContainer').replaceWith(new SelectionsView(self.models.selection).render().el);
        });

    };

    App.prototype = {
        models: {},
        collections: {},
        views: {}
    };

    return App;

});
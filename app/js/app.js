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

        var selection = new Selection();
        var uploads = new Uploads();
        var self = this;

        this.models.alert = new Alert();
        this.views.alert = new AlertView(this.models.alert, selection);

        $('#geographyZipCodesManualContainer').replaceWith(new ManualView(selection).render().el);
        $('#geographySelectionsContainer').replaceWith(new SelectionsView(selection).render().el);

        uploads.fetch({reset: true});
        uploads.on('sync', function () {
            $('#geographyZipCodesAlertContainer').replaceWith(self.views.alert.el);
            $('#geographyZipCodesUploadContainer').replaceWith(new UploadView(uploads, selection).render().el);
        });

    };

    App.prototype = {
        models: {},
        collections: {},
        views: {}
    };

    return App;

});
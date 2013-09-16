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

        this.models.search = new Search();
        this.models.alert = new Alert();

        this.collections.uploads = new Uploads();
        this.collections.uploads.on('sync', this.showUploadView, this).fetch({reset: true});

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
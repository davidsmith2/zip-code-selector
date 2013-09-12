define([
    'jquery',
    'underscore',
    'backbone',
    'models/selection',
    'collections/uploads',
    'views/manual',
    'views/selections',
    'views/upload'
],

function ($, _, Backbone, Selection, Uploads, ManualView, SelectionsView, UploadView) {

    var App = function () {

        var selection = new Selection();
        var uploads = new Uploads();

        uploads.fetch({reset: true});

        $('#geographyZipCodesUploadContainer').append(new UploadView(uploads, selection).render().el);
        $('#geographyZipCodesManualContainer').append(new ManualView(selection).render().el);
        $('#geographySelectionsContainer').append(new SelectionsView(selection).render().el);

    };

    App.prototype = {
        models: {},
        collections: {},
        views: {}
    };

    return App;

});
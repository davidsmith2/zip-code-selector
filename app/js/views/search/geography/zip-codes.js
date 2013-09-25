define([
    'jquery',
    'underscore',
    'backbone',
    'models/alert',
    'views/alert',
    'views/search/geography/zip-codes/upload/form',
    'views/search/geography/zip-codes/manual/form',
    'text!templates/search/geography/zip-codes.html'
],

function ($, _, Backbone, Alert, AlertView, UploadView, ManualView, template) {

    var ZipCodesView = Backbone.View.extend({

        id: 'geographyZipCodes',
        template: _.template($(template).html()),

        events: {},

        initialize: function (search, uploads) {
            this.search = search;
            this.uploads = uploads;
        },

        render: function () {
            this.$el.empty().append(this.template(this.search.toJSON()));
            this.$('#geographyZipCodesUploadContainer').replaceWith(new UploadView(this.search, this.uploads, new Alert()).render().el);
            this.$('#geographyZipCodesManualContainer').replaceWith(new ManualView(this.search, new Alert()).render().el);
            return this;
        }

    });

    return ZipCodesView;

});
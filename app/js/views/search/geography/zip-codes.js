define([
    'jquery',
    'underscore',
    'backbone',
    'views/search/geography/zip-codes/upload/form',
    'views/search/geography/zip-codes/manual/form',
    'text!templates/search/geography/zip-codes.html'
],

function ($, _, Backbone, UploadView, ManualView, template) {

    var ZipCodesView = Backbone.View.extend({

        id: 'geographyZipCodes',
        template: _.template($(template).html()),

        events: {},

        initialize: function (search) {
            this.uploadView = new UploadView();
            this.manualView = new ManualView();
            this.search = search;
            this.uploadView.on('fileAttached', this.onFileAttached, this);
            this.uploadView.on('fileDetached', this.onFileDetached, this);
            this.manualView.on('zipCodesEntered', this.onZipCodesEntered, this);
        },

        render: function () {
            this.$el.empty().append(this.template());
            this.$('#geographyZipCodesUploadContainer').replaceWith(this.uploadView.render().el);
            this.$('#geographyZipCodesManualContainer').replaceWith(this.manualView.render().el);
            return this;
        },

        onFileAttached: function (data) {
            this.search.set({
                zipCodeFile: data.fileName,
                zipCodes: data.zipCodes
            });
            this.manualView.disable();
        },

        onFileDetached: function () {
            this.search.set({
                zipCodeFile: '',
                zipCodes: []
            });
            this.manualView.enable();
        },

        onZipCodesEntered: function (zipCodes) {
            var self = this;

            _.each(zipCodes, function (zipCode) {
                self.search.addToZipCodes(zipCode);
            });
        }

    });

    return ZipCodesView;

});
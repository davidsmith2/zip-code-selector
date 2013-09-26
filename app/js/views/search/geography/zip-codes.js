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
            this.uploadView = new UploadView(this.uploads, new Alert());
            this.manualView = new ManualView(new Alert());
            this.uploadView.on('attached', this.onAttach, this);
            this.uploadView.on('detached', this.onDetach, this);
            this.manualView.on('entered', this.onEnter, this);
        },

        render: function () {
            this.$el.empty().append(this.template());
            this.$('#geographyZipCodesUploadContainer').replaceWith(this.uploadView.render().el);
            this.$('#geographyZipCodesManualContainer').replaceWith(this.manualView.render().el);
            return this;
        },

        onAttach: function (response) {
            this.search.set({
                zipCodeFile: response.fileName,
                zipCodes: response.zipCodes
            });
        },

        onDetach: function () {
            this.search.set({
                zipCodeFile: '',
                zipCodes: []
            });
        },

        onEnter: function (zipCodes) {
            var self = this;

            _.each(zipCodes, function (zipCode) {
                self.search.addToZipCodes(zipCode);
            });
        }

    });

    return ZipCodesView;

});
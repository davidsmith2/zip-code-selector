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
            this.uploadView.on('attached', this.onAttached, this);
            this.uploadView.on('detached', this.onDetached, this);
            this.manualView.on('entered', this.onEntered, this);
        },

        render: function () {
            this.$el.empty().append(this.template());
            this.$('#geographyZipCodesUploadContainer').replaceWith(this.uploadView.render().el);
            this.$('#geographyZipCodesManualContainer').replaceWith(this.manualView.render().el);
            return this;
        },

        onAttached: function (response) {
            this.search.set({
                zipCodeFile: response.fileName,
                zipCodes: response.zipCodes
            });
            this.manualView.disable();
        },

        onDetached: function () {
            this.search.set({
                zipCodeFile: '',
                zipCodes: []
            });
            this.manualView.enable();
        },

        onEntered: function (zipCodes) {
            var self = this;

            _.each(zipCodes, function (zipCode) {
                self.search.addToZipCodes(zipCode);
            });
        }

    });

    return ZipCodesView;

});
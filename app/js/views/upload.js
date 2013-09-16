define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'models/file',
    'text!templates/upload.html'
],

function ($, _, Backbone, config, File, template) {

    var UploadView = Backbone.View.extend({

        id: 'geographyZipCodesUpload',
        template: _.template($(template).html()),

        events: {
            'submit form':      'validateFile',
            'click .browse':    'browseFiles',
            'click .cancel':    'detachFile'
        },

        initialize: function (uploads, search) {
            this.uploads = uploads;
            this.search = search;
            this.listenTo(this.search, 'change:zipCodeFile', this.render);
        },

        render: function () {
            this.$el.empty().append(this.template(this.search.toJSON()));
            return this;
        },

        validateFile: function (e) {
            e.preventDefault();

            if (this.isValidFile()) {
                console.log('accepted');
                this.uploadFile(e.target);
            }
        },

        isValidFile: function () {
            var fileInput = this.$('input[type=file]'),
                fileName = fileInput.val(),
                validFileExts = fileInput.attr('accepts').split(',');

            if (!fileName) {
                mSSS.models.alert.set(config.alerts[0]);
                return false;
            }

            if (!this.isValidFileExt(validFileExts, fileName)) {
                mSSS.models.alert.set(config.alerts[1]);
                return false;
            }

            return true;
        },

        uploadFile: function (form) {
            var $form = $(form),
                progress = this.$('.progress'),
                bar = this.$('.bar'),
                self = this;

            require(['jquery', 'jqueryForm'], function ($) {
                $form.ajaxSubmit({
                    url: '/api/uploads',
                    type: 'post',
                    beforeSend: function () {
                        console.log('before send');
                        progress.removeClass('hide').addClass('in');
                        bar.width('0%');
                    },
                    uploadProgress: function (event, position, total, percentComplete) {
                        console.log('upload progress');
                        bar.width(percentComplete + '%');
                    },
                    success: function (data, textStatus, jqXHR) {
                        console.log('success');
                        self.handleResponse(data, jqXHR.responseText);
                    },
                    complete: function (jqXHR, textStatus) {
                        console.log('complete');
                        progress.removeClass('in').addClass('hide');
                        bar.width('100%');
                    },
                    error: function () {
                        console.log('error');
                    }
                });
            });
        },

        handleResponse: function (data, responseText) {
            var response = $.parseJSON(responseText);

            if (response.successMessage) {
                this.uploads.add(data);
                this.search.set('zipCodeFile', data.name);
                mSSS.models.alert.set(config.alerts[2]);
            } else if (response.warningMessage) {
                mSSS.models.alert.set(config.alerts[3]);
            } else if (response.alertMessage) {
                mSSS.models.alert.set(config.alerts[4]);
            }
        },

        browseFiles: function (e) {
            e.preventDefault();
            this.$('input[type=file]').trigger('click');
        },

        detachFile: function (e) {
            var fileName = this.search.get('zipCodeFile');

            e.preventDefault();
            this.uploads.findWhere({name: fileName}).destroy();
            this.search.set('zipCodeFile', '');
        },

        isValidFileExt: function (validFileExts, fileName) {
            return _.contains(validFileExts, this.getFileExt(fileName));
        },

        getFileExt: function (fileName) {
            return (fileName !== '') ? fileName.split('.').pop().toLowerCase() : '';
        }

    });

    return UploadView;

});
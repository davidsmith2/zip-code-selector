define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'views/alert',
    'models/file',
    'text!templates/upload.html'
],

function ($, _, Backbone, config, AlertView, File, template) {

    var UploadView = Backbone.View.extend({

        id: 'geographyZipCodesUpload',
        template: _.template($(template).html()),

        events: {
            'submit form':      'validateFile',
            'click .browse':    'browseFiles',
            'click .cancel':    'detachFile'
        },

        initialize: function (uploads, search, alert) {
            this.uploads = uploads;
            this.search = search;
            this.alert = alert;
            this.listenTo(this.search, 'change:zipCodeFile', this.render);
            this.listenTo(this.alert, 'change', this.render);
        },

        render: function () {

            console.log('rendering');

            this.$el.empty().append(this.template(this.search.toJSON()));
            this.$('.geographyZipCodesAlertContainer').empty().append(new AlertView(this.alert).render().el);
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
                this.alert.set(config.alerts[0]);
                return false;
            }

            if (!this.isValidFileExt(validFileExts, fileName)) {
                this.alert.set(config.alerts[1]);
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
                this.alert.set(config.alerts[2]);
            } else if (response.warningMessage) {
                this.alert.set(config.alerts[3]);
            } else if (response.alertMessage) {
                this.alert.set(config.alerts[4]);
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
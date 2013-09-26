define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'models/file',
    'models/modal',
    'views/alert',
    'views/modal',
    'views/search/geography/zip-codes/upload/input',
    'text!templates/search/geography/zip-codes/upload/form.html'
],

function ($, _, Backbone, config, File, Modal, AlertView, ModalView, UploadInputView, template) {

    var UploadView = Backbone.View.extend({

        id: 'geographyZipCodesUpload',
        template: _.template($(template).html()),

        events: {
            'click .attach':            'attachFile',
            'change input[name=file]':  'handleFileSelection',
            'click .detach':            'detachFile',
            'click .help':              'showDialog'
        },

        initialize: function (uploads, alert) {
            this.uploads = uploads;
            this.alert = alert;
            this.file = new File();
        },

        render: function () {
            this.$el.empty().append(this.template(this.file.toJSON()), this.fileInput);
            this.$('.alertContainer').empty().append(new AlertView(this.alert).render().el);
            this.$('#geographyZipCodesUploadInputContainer').replaceWith(new UploadInputView(this.file).render().el);
            return this;
        },

        attachFile: function (e) {
            e.preventDefault();
            this.$('input[name=file]').trigger('click');
        },

        handleFileSelection: function (e) {
            this.file.set(this.getFileInfo($(e.target)));

            if (this.file.isValid()) {
                this.uploadFile();
            } else {
                this.alert.set(this.file.validationError);
                this.$('.detach').trigger('click');
            }

        },

        uploadFile: function () {
            var progress = this.$('.progress'),
                bar = this.$('.bar'),
                self = this;

            require(['jqueryForm'], function ($) {

                this.$('form').ajaxSubmit({
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
                this.alert.set({
                    connotation: 'success',
                    content: response.successMessage
                });
                this.trigger('attached', response)
            }

            if (response.warningMessage) {
                this.alert.set(config.alerts[3]);
            }

            if (response.alertMessage) {
                this.alert.set(config.alerts[4]);
            }
        },

        detachFile: function (e) {
            e.preventDefault();
            this.file.set('name', '');
            this.alert.set(this.alert.defaults);
            this.$('input[name=file]').val('').trigger('change');
            this.trigger('detached');
        },

        showDialog: function (e) {
            e.preventDefault();
            $('.modalContainer').html(new ModalView(new Modal({
                content: config.modals[0]
            })).render().el);
        },

        getFileInfo: function ($fileInput) {
            var path = $fileInput.val(),
                name = this.file.getName(path),
                extension = this.file.getExtension(name),
                validExtensions = $fileInput.attr('accepts').split(',');

            return {
                name: name,
                extension: extension,
                path: path,
                validExtensions: validExtensions
            };

        }

    });

    return UploadView;

});
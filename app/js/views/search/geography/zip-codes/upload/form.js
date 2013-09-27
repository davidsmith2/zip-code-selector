define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'models/alert',
    'models/file',
    'models/modal',
    'views/alert',
    'views/modal',
    'views/search/geography/zip-codes/upload/input',
    'text!templates/search/geography/zip-codes/upload/form.html'
],

function ($, _, Backbone, config, Alert, File, Modal, AlertView, ModalView, InputView, template) {

    var UploadView = Backbone.View.extend({

        id: 'geographyZipCodesUpload',
        template: _.template($(template).html()),

        events: {
            'change input[type=file]': 'handleFileSelection',
            'click .help': 'showDialog'
        },

        initialize: function () {
            this.alert = new Alert();
            this.modal = new Modal({
                content: config.modals[0]
            });
            this.file = new File();
            this.alertView = new AlertView(this.alert);
            this.modalView = new ModalView(this.modal);
            this.inputView = new InputView(this.file);
            this.inputView.on('attach', this.onAttach, this);
            this.inputView.on('detach', this.onDetach, this);
        },

        render: function () {
            this.$el.empty().append(this.template(this.file.toJSON()), this.fileInput);
            this.$('.alertContainer').empty().append(this.alertView.render().el);
            this.$('#geographyZipCodesUploadInputContainer').replaceWith(this.inputView.render().el);
            return this;
        },

        handleFileSelection: function (e) {
            this.file.set(this.getFileInfo(this.fileInput));

            // validate file based on what we know from client
            if (this.file.isValid()) {
                this.uploadFile();
            } else {
                this.file.reset();
                this.alert.set(this.file.validationError);
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
                this.alert.set({
                    connotation: 'success',
                    content: response.successMessage
                });
                this.trigger('fileAttached', response);
            }

            if (response.warningMessage) {
                this.alert.set(config.alerts[3]);
            }

            if (response.alertMessage) {
                this.alert.set(config.alerts[4]);
            }
        },

        showDialog: function (e) {
            e.preventDefault();
            $('.modalContainer').html(this.modalView.render().el);
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

        },

        onAttach: function () {
            this.fileInput = this.$('input[type=file]').trigger('click');
        },

        onDetach: function () {
            this.alert.reset();
            this.fileInput.val('');
            this.trigger('fileDetached');
        }

    });

    return UploadView;

});
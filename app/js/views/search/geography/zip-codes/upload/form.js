define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'models/alert',
    'models/file',
    'models/modal',
    'views/alert',
    'views/search/geography/zip-codes/upload/help',
    'views/search/geography/zip-codes/upload/input',
    'text!templates/search/geography/zip-codes/upload/form.html'
],

function ($, _, Backbone, config, Alert, File, Modal, AlertView, HelpView, InputView, template) {

    var UploadView = Backbone.View.extend({

        id: 'geographyZipCodesUpload',
        template: _.template($(template).html()),

        events: {
            'click .attach': 'attachFile',
            'change input[type=file]': 'handleFileSelection',
            'click .detach': 'detachFile',
            'click .help': 'showDialog'
        },

        initialize: function () {
            this.alert = new Alert();
            this.file = new File();
            this.alertView = new AlertView(this.alert);
            this.inputView = new InputView(this.file);
        },

        render: function () {
            this.$el.empty().append(this.template(this.file.toJSON()));
            this.$('.alertContainer').empty().append(this.alertView.render().el);
            this.$('form > fieldset').replaceWith(this.inputView.render().el);
            return this;
        },

        attachFile: function (e) {
            e.preventDefault();
            this.$('input[type=file]').trigger('click');
        },

        handleFileSelection: function (e) {
            var $input = $(e.target),
                path = $input.val(),
                validExtensions = $input.attr('accepts');

            this.file.set(this.getFileInfo(path, validExtensions));

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

            require(['jquery-form'], function ($) {

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
            $('.modalContainer').html(new HelpView().render().el);
        },

        getFileInfo: function (path, validExtensions) {
            var name = this.file.getName(path);

            return {
                extension: this.file.getExtension(name),
                name: name,
                path: path,
                validExtensions: validExtensions.split(',')
            };

        },

        detachFile: function (e) {
            e.preventDefault();
            this.file.reset();
            this.alert.reset();
            this.$('input[type=file]').val('');
            this.trigger('fileDetached');
        }

    });

    return UploadView;

});
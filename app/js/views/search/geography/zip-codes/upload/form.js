define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'models/file',
    'models/modal',
    'views/alert',
    'views/modal',
    'text!templates/search/geography/zip-codes/upload/form.html'
],

function ($, _, Backbone, config, File, Modal, AlertView, ModalView, template) {

    var UploadView = Backbone.View.extend({

        id: 'geographyZipCodesUpload',
        template: _.template($(template).html()),

        events: {
            'click .browse':            'browseFiles',
            'change input[name=file]':  'handleFileSelect',
            'click .cancel':            'detachFile',
            'submit form':              'validateFile',
            'click .help':              'showDialog'
        },

        initialize: function (search, uploads, alert) {
            this.search = search;
            this.uploads = uploads;
            this.alert = alert;
            this.listenTo(this.search, 'change:zipCodeFile', this.render);
            this.listenTo(this.alert, 'change', this.render);
        },

        render: function () {
            this.$el.empty().append(this.template(this.search.toJSON()));
            this.$('.alertContainer').empty().append(new AlertView(this.alert).render().el);
            return this;
        },

        browseFiles: function (e) {
            var self = this;

            e.preventDefault();
            this.$('input[name=file]').trigger('click');
        },

        handleFileSelect: function (e) {
            this.$('.fileName').text(this.getFileInfo($(e.target))['name']);
        },

        detachFile: function (e) {
            e.preventDefault();
            this.search.set('zipCodes', []);
            this.alert.set(this.alert.defaults);
            this.$('input[name=file]').val('').trigger('change');
        },

        validateFile: function (e) {
            e.preventDefault();

            if (this.isValidFile()) {
                this.uploadFile(e.target);
            }
        },

        isValidFile: function () {
            var fileInfo = this.getFileInfo(this.$('input[name=file]'));

            if (!fileInfo.name) {
                this.alert.set(config.alerts[0]);
                return false;
            }
            if (!this.isValidFileExt(fileInfo.validExts, fileInfo.name)) {
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

            require(['jqueryForm'], function ($) {
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
                this.search.set({
                    zipCodeFile: response.fileName,
                    zipCodes: response.zipCodes
                });
                this.alert.set({
                    connotation: 'success',
                    content: response.successMessage
                });
                this.$('.fileName').text(this.search.get('zipCodeFile'));
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
            $('.modalContainer').html(new ModalView(new Modal({
                content: config.modals[0]
            })).render().el);
        },

        isValidFileExt: function (validFileExts, fileName) {
            return _.contains(validFileExts, this.getFileExt(fileName));
        },

        getFileName: function (filePath) {
            return filePath.split('\\').pop();
        },

        getFileExt: function (fileName) {
            return (fileName !== '') ? fileName.split('.').pop().toLowerCase() : '';
        },

        getFileInfo: function ($input) {
            var path = $input.val(),
                name = this.getFileName(path),
                validExts = $input.attr('accepts').split(',');

            return {
                path: path,
                name: name,
                validExts: validExts
            };
        }

    });

    return UploadView;

});
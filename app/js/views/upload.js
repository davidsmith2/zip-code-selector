define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/upload.html'
],

function ($, _, Backbone, template) {

    var UploadView = Backbone.View.extend({

        id: 'geographyZipCodesUpload',
        template: _.template($(template).html()),

        events: {
            'submit #geographyZipCodesUploadForm': 'handleSubmit',
            'click #cancel': 'handleCancel'
        },

        initialize: function (uploads, selection) {
            this.uploads = uploads;
            this.selection = selection.on('change', this.render, this);
        },

        render: function () {
            this.$el.empty().append(this.template(this.selection.toJSON()));
            return this;
        },

        handleSubmit: function (e) {
            var form = $(e.target),
                progress = this.$('.progress'),
                bar = this.$('.bar'),
                self = this;

            e.preventDefault();
            require(['jquery', 'jqueryForm'], function ($) {
                form.ajaxSubmit({
                    url: '/api/uploads',
                    type: 'post',
                    beforeSend: function () {
                        console.log('before send')
                        progress.removeClass('hide').addClass('in');
                        bar.width('0%');
                    },
                    uploadProgress: function (a, b, c, percentComplete) {
                        console.log('upload progress')
                        bar.width(percentComplete + '%');
                    },
                    success: function (data, textStatus, jqXHR) {
                        console.log('success')
                        self.uploads.create(data);
                        self.selection.set('zipCodeFile', data.name);
                    },
                    complete: function (jqXHR, textStatus) {
                        console.log('complete')
                        self.handleResponse(jqXHR.responseText);
                        progress.removeClass('in').addClass('hide');
                        bar.width('100%');
                    },
                    error: function () {
                        console.log('error');
                    }
                });
            });
        },

        handleCancel: function (e) {
            var fileName = this.selection.get('zipCodeFile'),
                file = this.uploads.findWhere({name: fileName});

            e.preventDefault();
            file.destroy();
            this.selection.set('zipCodeFile', '');
        },

        handleResponse: function (responseText) {
            var response = $.parseJSON(responseText);

            this.$('.msg-success').html(response.successMessage);
            this.$('.msg-warning').html(response.warningMessage);
            this.$('.msg-error').html(response.errorMessage);
        }

    });

    return UploadView;

});
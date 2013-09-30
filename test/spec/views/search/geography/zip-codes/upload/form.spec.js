define([
    'models/file',
    'views/search/geography/zip-codes/upload/form',
    'views/search/geography/zip-codes/upload/input'
],

function (Model, View, Subview) {

    return describe('View :: Search > Geography > ZIP Codes > Upload Form', function () {

        var that = this;

        beforeEach(function () {
            that.model = new Model();
            that.view = new View();
            that.subview = new Subview(that.model);
            $('#sandbox').html(that.view.render().el);

            var fileInput = that.view.$('input[type=file]');
            var validExtensions = that.view.getFileInfo(fileInput)['validExtensions'];

            that.model.set('validExtensions', validExtensions);

        });

        afterEach(function () {
            that.view.remove();
        });

        describe('uploads a file', function () {

            it('should show filename if extension is valid', function () {
                that.model.set({
                    name: 'test.txt',
                    extension: 'txt'
                });

                if (that.model.isValid()) {
                    expect(that.subview.$('.uneditable-input').text()).toBeTruthy();
                }
            });

            it('should not show filename if extension is invalid', function () {
                that.model.set({
                    name: 'test.xls',
                    extension: 'xls'
                });

                if (!that.model.isValid()) {
                    that.model.reset();
                    expect(that.subview.$('.uneditable-input').text()).toEqual('');
                }
            });
        });

    });

});
define([
    'models/file',
    'views/search/geography/zip-codes/upload/form',
    'views/search/geography/zip-codes/upload/input'
],

function (Model, View, Subview) {

    return describe('View :: Search > Geography > ZIP Codes > Upload Form', function () {

        var that = this;

        beforeEach(function () {
            var fileInput, validExtensions;

            that.model = new Model();
            that.view = new View();
            that.subview = new Subview(that.model);
            $('#sandbox').html(that.view.render().el);
            that.view.fileInput = that.view.$('input[type=file]');
            validExtensions = that.view.getFileInfo(that.view.fileInput)['validExtensions'];
            that.model.set('validExtensions', validExtensions);
        });

        afterEach(function () {
            that.view.remove();
        });

        describe('uploads a file', function () {

            it('should have a file input with a filled-out accepts attribute', function () {
                expect(that.view.fileInput.length).toEqual(1);
                expect(typeof that.view.fileInput.attr('accepts')).toEqual('string');
            });

            it('should show the filename if the extension is valid', function () {
                that.model.set({
                    name: 'test.txt',
                    extension: 'txt'
                });

                if (that.model.isValid()) {
                    expect(that.subview.$('.uneditable-input').text()).toBeTruthy();
                }
            });

            it('should not show the filename if the extension is invalid', function () {
                that.model.set({
                    name: 'test.xls',
                    extension: 'xls'
                });

                if (!that.model.isValid()) {
                    that.model.reset();
                    expect(that.subview.$('.uneditable-input').text()).toEqual('');
                }
            });

            it('should return a fileInfo object from an input element of type "file"', function () {
                var fileInfo = that.view.getFileInfo($('<input accepts="txt" />').val('C:/fakepath/test.txt'));

                expect(typeof fileInfo).toEqual('object');
                expect(fileInfo.extension).toEqual('txt');
                //expect(fileInfo.name).toEqual('test.txt');
                expect(fileInfo.path).toEqual('C:/fakepath/test.txt');
                expect(fileInfo.validExtensions).toEqual(['txt']);

            });

        });

    });

});
define([
    'models/file',
    'views/search/geography/zip-codes/upload/form',
    'views/search/geography/zip-codes/upload/input'
],

function (Model, View, Subview) {

    return describe('View :: Search > Geography > ZIP Codes > Upload Form', function () {

        var that = this, $input, accepts, extensions;

        beforeEach(function () {

            // make some objects
            that.model = new Model();
            that.view = new View();
            that.subview = new Subview(that.model);

            // render the main view
            $('#sandbox').html(that.view.render().el);

            // grab some variables
            $input = that.view.$('input[type=file]');
            accepts = $input.attr('accepts');
            extensions = that.view.getFileInfo('', accepts)['validExtensions'];

            // update the model
            that.model.set('validExtensions', extensions);

        });

        afterEach(function () {
            that.view.remove();
        });

        describe('uploads a file', function () {

            it('should return a file info object given the file\'s path (string) and valid extensions (string)', function () {
                var path = 'C:\\fakepath\\test.txt',
                    fileInfo = that.view.getFileInfo(path, accepts);

                expect(typeof fileInfo).toEqual('object');

                expect(fileInfo.extension).toEqual('txt');
                expect(fileInfo.name).toEqual('test.txt');
                expect(fileInfo.path).toEqual(path);
                expect(fileInfo.validExtensions).toEqual(['txt']);

            });

            it('should have a file input with an accepts attribute', function () {
                expect($input.length).toEqual(1);
                expect(typeof accepts).toEqual('string');
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

        });

    });

});
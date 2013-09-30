define([
    'models/file',
    'views/search/geography/zip-codes/upload/input'
],

function (Model, View) {

    return describe('View :: Attach a ZIP code file', function () {

        var that = this;

        beforeEach(function () {
            that.model = new Model();
            that.view = new View(that.model);
        });

        describe('renders file input', function () {
            it('should re-render when a file is attached', function () {
                that.model.set('name', 'test.txt');

                expect(that.view.$('.uneditable-input').text()).toEqual('test.txt');
                expect(that.view.$('.btn').text()).toEqual('Detach');
                expect(that.view.$('.btn').hasClass('detach')).toBeTruthy();

            });
        });

    });

});


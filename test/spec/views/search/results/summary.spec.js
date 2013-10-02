define([
    'models/search',
    'views/search/results/summary'
],

function (Model, View) {

    return describe('View :: Search > Results > Summary', function () {

        var that = this;

        beforeEach(function () {
            that.model = new Model();
            that.view = new View(that.model);
            $('#sandbox').html(that.view.render().el);
        });

        afterEach(function () {
            that.view.remove();
        });

        describe('search options', function () {

            it('should open the options menu', function () {
                that.view.$('.dropdown-toggle').trigger('click');
                expect(that.view.$('.dropdown').hasClass('open')).toBeTruthy();
                that.view.$('.dropdown-toggle').trigger('click');
                expect(that.view.$('.dropdown').hasClass('open')).toBeFalsy();
            });

        });

    });
});
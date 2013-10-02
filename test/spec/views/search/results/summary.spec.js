define([
    'models/search',
    'views/search/results/summary'
],

function (Model, View) {

    return describe('View :: Search > Results > Summary', function () {

        var dropdown,
            dropdownButton,
            dropdownMenu,
            clickDropdown,
            that = this;

        beforeEach(function () {

            that.model = new Model();
            that.view = new View(that.model);

            $('#sandbox').html(that.view.render().el);

            dropdown = that.view.$('.dropdown');
            dropdownButton = that.view.$('.dropdown-toggle');
            dropdownMenu = that.view.$('.dropdown-menu');

            clickDropdown = function () {
                dropdownButton.trigger('click');
            };

        });

        afterEach(function () {
            that.view.remove();
        });

        describe('options button', function () {
            it('should open and close the options menu', function () {
                clickDropdown();
                expect(dropdown.hasClass('open')).toBeTruthy();
                clickDropdown();
                expect(dropdown.hasClass('open')).toBeFalsy();
            });
        });

        describe('options menu', function () {
            it('should remain open when the options button is clicked', function () {
                clickDropdown();
                dropdownMenu.trigger('click');
                expect(dropdown.hasClass('open')).toBeTruthy();
            });
        });

    });

});
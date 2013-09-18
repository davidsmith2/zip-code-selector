define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search-results.html'
],

function ($, _, Backbone, template) {

    var SearchResultsView = Backbone.View.extend({

        id: 'searchResults',
        template: _.template($(template).html()),

        events: {},

        initialize: function (search, students) {
            this.search = search;
            this.students = students;
            this.render();
            this.listenTo(search, 'change:zipCodes', this.update);
        },

        update: function () {
            this.render(this.getResults());
        },

        getResults: function () {
            var results = [],
                self = this;

            _.each(this.search.get('zipCodes'), function (zipCode, index) {
                results.push(self.students.where({zipCode: zipCode}));
            });

            return _.flatten(results);
        },

        render: function (results) {
            var count = 0,
                percent = 0,
                self = this;

            if (results) {
                count = results.length;
                percent = (count / self.students.length) * 100;
            }

            this.$el.empty().append(this.template({
                count: count,
                percent: percent
            }));

            return this;
        }

    });

    return SearchResultsView;

});
define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'views/save-search',
    'text!templates/search-results.html'
],

function ($, _, Backbone, config, SaveSearchView, template) {

    var SearchResultsView = Backbone.View.extend({

        id: 'searchResults',
        template: _.template($(template).html()),

        events: {
            'click .open': 'showDialog'
        },

        initialize: function (search, students, searches) {
            this.search = search;
            this.students = students;
            this.searches = searches;
            this.listenTo(search, 'change:zipCodes sync', this.update);
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
                searchName: this.search.get('name'),
                resultsCount: count,
                resultsPercent: percent
            }));

            return this;
        },

        showDialog: function (e) {
            e.preventDefault();
            this.$('.modalContainer').empty().append(new SaveSearchView(this.search, this.searches).render().el);
        }

    });

    return SearchResultsView;

});
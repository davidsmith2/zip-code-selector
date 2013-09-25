define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'views/search/results/save',
    'text!templates/search/results/view.html'
],

function ($, _, Backbone, config, SaveSearchView, template) {

    var SearchResultsView = Backbone.View.extend({

        id: 'searchResults',
        template: _.template($(template).html()),

        events: {
            'click .open': 'showDialog'
        },

        initialize: function (search, searches, students) {
            this.search = search;
            this.searches = searches;
            this.students = students;
            this.listenTo(this.search, 'change sync', this.render);
        },

        render: function () {
            this.$el.empty().append(this.template({
                searchName: this.search.get('name'),
                resultsCount: this.getResults().length,
                resultsPercent: (this.getResults().length / this.students.length) * 100
            }));

            return this;
        },

        getResults: function () {
            var results = [],
                self = this;

            _.each(this.search.get('zipCodes'), function (zipCode) {
                results.push(self.students.where({zipCode: zipCode}));
            });

            return _.flatten(results);
        },

        showDialog: function (e) {
            e.preventDefault();
            $('.modalContainer').html(new SaveSearchView(this.search, this.searches).render().el);
        }

    });

    return SearchResultsView;

});
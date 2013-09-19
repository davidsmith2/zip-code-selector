define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'models/modal',
    'views/modal',
    'text!templates/search-results.html'
],

function ($, _, Backbone, config, Modal, ModalView, template) {

    var SearchResultsView = Backbone.View.extend({

        id: 'searchResults',
        template: _.template($(template).html()),

        events: {
            'click .save': 'triggerModal',
            'click .confirm': 'saveSearch'
        },

        initialize: function (search, students, searches) {
            this.search = search;
            this.students = students;
            this.searches = searches;
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
        },

        triggerModal: function () {
            this.$('.modalContainer').empty().append(new ModalView(new Modal(config.modals[0])).render().el);
        },

        saveSearch: function () {
            this.searches.add(this.search);
        }

    });

    return SearchResultsView;

});
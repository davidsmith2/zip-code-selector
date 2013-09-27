define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/geography/selections.html'
],

function ($, _, Backbone, template) {

    var SelectionsView = Backbone.View.extend({

        id: 'geographySelections',
        template: _.template($(template).html()),

        events: {
            'click .remove': 'removeItem'
        },

        initialize: function (search) {
            this.search = search;
            this.listenTo(this.search, 'change', this.render);
        },

        render: function () {
            this.$el.empty().append(this.template(this.search.toJSON()));
            this.addRemoveItemButtons();
            return this;
        },

        addRemoveItemButtons: function () {
            this.$('.description').parent().prepend('<a class="remove" href="#">&times;</a>');
        },

        removeItem: function (e) {
            var $target = $(e.target),
                targetTitle = $target.attr('title'),
                $itemHtml = $target.next('.description'),
                itemText = $itemHtml.text(),
                $itemContainer = $itemHtml.parent(),
                $selectionContainer = $itemContainer.closest('.selections'),
                selectionContainerId = $selectionContainer.attr('id'),
                self = this,
                selectionActions;

            e.preventDefault();

            selectionActions = {
                zipCodeFile: function () {
                    self.search.set({
                        zipCodeFile: '',
                        zipCodes: []
                    });
                },
                zipCodes: function () {
                    self.search.removeFromZipCodes(itemText);
                }
            };
            selectionActions[selectionContainerId]();
            $itemContainer.remove();
        }

    });

    return SelectionsView;

});
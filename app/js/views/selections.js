define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/selections.html'
],

function ($, _, Backbone, template) {

    var SelectionsView = Backbone.View.extend({

        id: 'geographySelections',
        template: _.template($(template).html()),

        events: {
            'click .remove': 'removeItem'
        },

        initialize: function (selection) {
            this.selection = selection;
            this.listenTo(this.selection, 'change', this.render);
        },

        render: function () {
            this.$el.empty().append(this.template(this.selection.toJSON()));
            return this;
        },

        removeItem: function (e) {
            var $target = $(e.target),
                targetTitle = $target.attr('title'),
                $itemHtml = $target.prev('.desc'),
                itemText = $itemHtml.text(),
                $itemContainer = $itemHtml.parent(),
                $selectionContainer = $itemContainer.closest('.selections'),
                selectionContainerId = $selectionContainer.attr('id'),
                self = this,
                selectionActions;

            e.preventDefault();

            selectionActions = {
                zipCodeFile: function () {
                    self.selection.set('zipCodeFile', '');
                },
                zipCodes: function () {
                    self.selection.removeFromZipCodes(itemText);
                }
            };

            if (targetTitle === itemText) {
                selectionActions[selectionContainerId]();
                $itemContainer.remove();
            }
        }

    });

    return SelectionsView;

});
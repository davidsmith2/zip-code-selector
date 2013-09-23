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

        initialize: function (search) {
            this.search = search;
            this.listenTo(this.search, 'change', this.render);
            this.on('render', this.addRemoveItemButtons, this);
        },

        render: function () {
            this.$el.empty().append(this.template(this.search.toJSON()));
            return this.trigger('render');
        },

        addRemoveItemButtons: function () {
            this.$('.description').parent().append('<a class="remove" href="#">&times;</a>');
        },

        removeItem: function (e) {
            var $target = $(e.target),
                targetTitle = $target.attr('title'),
                $itemHtml = $target.prev('.description'),
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
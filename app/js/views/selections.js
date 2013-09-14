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

        initialize: function (models, collections) {
            this.models = models;
            this.collections = collections;
            this.listenTo(this.models.zipCodeFile, 'change:name', this.updateZipCodeFile);
            this.listenTo(this.collections.zipCodes, 'reset', this.updateZipCodes);
            this.on('render', this.addRemoveItemButtons, this);
        },

        render: function () {
            this.$el.empty().append(this.template(this.models.selection.toJSON()));
            return this.trigger('render');
        },

        addRemoveItemButtons: function () {
            this.$('.description').parent().append('<a class="remove" href="#">X</a>');
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
                    self.models.selection.set('zipCodeFile', '');
                },
                zipCodes: function () {
                    self.models.selection.removeFromZipCodes(itemText);
                }
            };

            selectionActions[selectionContainerId]();
            $itemContainer.remove();
        },

        updateZipCodeFile: function () {
            this.models.selection.set('zipCodeFile', this.models.zipCodeFile.get('name'));
            this.render();
        },

        updateZipCodes: function () {
            var zipCodes = [];

            this.collections.zipCodes.each(function (zipCode) {
                zipCodes.push(zipCode.get('code'));
            });
            this.models.selection.set('zipCodes', zipCodes);
            this.render();
        }

    });

    return SelectionsView;

});
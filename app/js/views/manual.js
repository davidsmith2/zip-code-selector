define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'models/selection',
    'views/manual/input',
    'text!templates/manual.html'
],

function ($, _, Backbone, config, Selection, ManualInputView, template) {

    var rowNum = 0,
        ManualView;

    ManualView = Backbone.View.extend({

        id: 'geographyZipCodesManual',
        template: _.template($(template).html()),

        events: {
            'click #addInputs': 'handleAddInputs',
            'submit #geographyZipCodesManualForm': 'handleSubmit'
        },

        initialize: function (selection) {
            this.selection = selection;
        },

        render: function () {
            var numRows = config.manual.minInputs / config.manual.inputsPerRow;

            this.$el.append(this.template());
            this.renderRows(numRows);
            return this;
        },

        renderRows: function (numRows) {
            for (var i = 0; i < numRows; i++) {
                this.$('#geographyZipCodesManualInputs').append(this.renderRow(rowNum++));
            }
        },

        renderRow: function (rowNum) {
            var lastInputNum = rowNum * config.manual.inputsPerRow,
                $html;

            for (var i = 1; i <= config.manual.inputsPerRow; i++) {
                if (this.isStartOfRow(i)) {
                    $html = $('<div />');
                }
                $html.append(this.renderInput(i + lastInputNum));
            }

            return $html;
        },

        renderInput: function (inputNum) {
            return new ManualInputView({inputNum: inputNum}).render().el;
        },

        isStartOfRow: function (inputNum) {
            return ((inputNum % config.manual.inputsPerRow) === 1);
        },

        isLastRow: function (rowNum) {
            return ((config.manual.maxInputs / rowNum) === config.manual.inputsPerRow);
        },

        handleAddInputs: function (e) {
            e.preventDefault();
            this.renderRows(config.manual.addRows);

            if (this.isLastRow(rowNum)) {
                $(e.target).attr('disabled', 'disabled');
            }
        },

        handleSubmit: function (e) {
            var form = $(e.target),
                inputs = this.$('input[type=text]'),
                self = this;

            e.preventDefault();
            $.each(inputs, function () {
                var input = $(this),
                    value = input.val();

                if (value) {
                    self.selection.addToZipCodes(value);
                    input.val('');
                }

            });
        }

    });

    return ManualView;

});
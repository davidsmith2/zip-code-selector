define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'models/zip-code',
    'views/manual/input',
    'text!templates/manual.html'
],

function ($, _, Backbone, config, ZipCode, ManualInputView, template) {

    var rowNum = 0,
        ManualView;

    ManualView = Backbone.View.extend({

        id: 'geographyZipCodesManual',
        template: _.template($(template).html()),

        events: {
            'click #addInputs': 'addInputs',
            'submit #geographyZipCodesManualForm': 'submitForm'
        },

        initialize: function (zipCodes) {
            this.zipCodes = zipCodes;
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

        addInputs: function (e) {
            e.preventDefault();
            this.renderRows(config.manual.addRows);

            if (this.isLastRow(rowNum)) {
                $(e.target).attr('disabled', 'disabled');
            }
        },

        submitForm: function (e) {
            var $inputs = this.$('input[type=text]'),
                zipCodes = [],
                self = this;

            e.preventDefault();

            _.each(this.getUniqueZipCodes($inputs), function (zipCode) {
                zipCodes.push(new ZipCode({
                    code: zipCode
                }));
            });

            this.zipCodes.reset(zipCodes);
            $inputs.val('');
        },

        getUniqueZipCodes: function ($elements) {
            var array = [];

            _.each(_.filter($elements, function (element) {
                return $(element).val();
            }), function (element) {
                array.push($(element).val());
            });

            return _.uniq(array);
        }

    });

    return ManualView;

});
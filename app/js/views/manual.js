define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'views/alert',
    'views/manual/input',
    'text!templates/manual.html'
],

function ($, _, Backbone, config, AlertView, ManualInputView, template) {

    var rowNum = 0,
        ManualView;

    ManualView = Backbone.View.extend({

        id: 'geographyZipCodesManual',
        template: _.template($(template).html()),

        events: {
            'click #addInputs': 'addInputs',
            'submit #geographyZipCodesManualForm': 'submitForm'
        },

        initialize: function (search, alert) {
            this.search = search;
            this.alert = alert;
        },

        render: function () {
            var numRows = config.manual.minInputs / config.manual.inputsPerRow;

            this.$el.empty().append(this.template());
            this.renderRows(numRows);
            this.$('.alertContainer').empty().append(new AlertView(this.alert).render().el);
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
                $(e.target).hide();
                this.alert.set(config.alerts[5]);
            }
        },

        submitForm: function (e) {
            var $inputs = this.$('input[type=text]'),
                zipCodes = [],
                self = this;

            e.preventDefault();
            _.each(this.getUniqueZipCodes($inputs), function (zipCode) {
                self.search.addToZipCodes(zipCode);
            });
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
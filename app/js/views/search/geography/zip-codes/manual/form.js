define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'models/alert',
    'views/alert',
    'views/search/geography/zip-codes/manual/input',
    'text!templates/search/geography/zip-codes/manual/form.html'
],

function ($, _, Backbone, config, Alert, AlertView, InputView, template) {

    var rowNum = 0,
        ManualView = Backbone.View.extend({

        id: 'geographyZipCodesManual',
        template: _.template($(template).html()),

        events: {
            'click .add': 'addInputs',
            'submit form': 'submitForm'
        },

        initialize: function () {
            this.alert = new Alert();
            this.alertView = new AlertView(this.alert);
        },

        render: function () {
            var numRows = config.manual.minInputs / config.manual.inputsPerRow;

            this.$el.empty().append(this.template());
            this.renderRows(numRows);
            this.$('.alertContainer').empty().append(this.alertView.render().el);
            return this;
        },

        renderRows: function (numRows) {
            for (var i = 0; i < numRows; i++) {
                this.$('form > fieldset').append(this.renderRow(rowNum++));
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
            return new InputView({
                inputNum: inputNum
            }).render().el;
        },

        addInputs: function (e) {
            e.preventDefault();
            this.renderRows(config.manual.addRows);

            if (this.isLastRow(rowNum)) {
                $(e.target).hide();
                this.alert.set(config.alerts[5]);
            }
        },

        isStartOfRow: function (inputNum) {
            return ((inputNum % config.manual.inputsPerRow) === 1);
        },

        isLastRow: function (rowNum) {
            return ((config.manual.maxInputs / rowNum) === config.manual.inputsPerRow);
        },

        submitForm: function (e) {
            var $textInputs = this.$('input[type=text]');

            e.preventDefault();
            this.trigger('zipCodesEntered', this.getUniqueZipCodes($textInputs));
            $textInputs.val('');
        },

        getUniqueZipCodes: function ($elements) {
            var array = [];

            _.each(_.filter($elements, function (element) {
                return $(element).val();
            }), function (element) {
                array.push($(element).val());
            });

            return _.uniq(array);
        },

        disable: function () {
            this.$('button[type=submit]').attr('disabled', 'disabled');
        },

        enable: function () {
            this.$('button[type=submit]').removeAttr('disabled');
        }

    });

    return ManualView;

});
define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'text!templates/alert.html'
],

function ($, _, Backbone, config, template) {

    var AlertView = Backbone.View.extend({

        template: _.template($(template).html()),

        events: {
            'click .close': 'close'
        },

        initialize: function (model) {
            this.model = model;
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            var self = this;
            
            require(['bootstrap-alert'], function ($) {
                self.$el
                    .removeClass()
                    .empty()
                    .append(self
                        .template(
                            self.model
                                .toJSON()
                            )
                        )
                    .alert();

                if (self.model.get('content')) {
                    self.$el.addClass('alert');
                }
                if (self.model.get('connotation')) {
                    self.$el.addClass('alert-' + self.model.get('connotation'));
                }
                if (self.model.get('block')) {
                    self.$el.addClass('alert-block');
                }
            });
            return this;
        },

        close: function () {
            this.$el.alert('close');
        }

    });

    return AlertView;

});
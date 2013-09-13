define([
    'underscore',
    'backbone'
],

function (_, Backbone) {
    
    var Alert = Backbone.Model.extend({

        defaults: {
            message: '',
            type: ''
        }

    });

    return Alert;

});
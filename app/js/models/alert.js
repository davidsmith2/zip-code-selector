define([
    'underscore',
    'backbone'
],

function (_, Backbone) {
    
    var Alert = Backbone.Model.extend({

        defaults: {
            block: false,
            connotation: '',
            content: ''
        }

    });

    return Alert;

});
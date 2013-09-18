define([
    'underscore',
    'backbone'
],

function (_, Backbone) {
    
    var Student = Backbone.Model.extend({

        defaults: {
            name: '',
            zipCode: []
        }

    });

    return Student;

});
define([
    'underscore',
    'backbone',
    'models/student'
],

function (_, Backbone, Student) {
    
    var Students = Backbone.Collection.extend({

        model: Student,
        url: '/api/students'

    });

    return Students;

});
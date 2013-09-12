define([
    'underscore',
    'backbone'
],

function (_, Backbone) {
    
    var File = Backbone.Model.extend({

        defaults: {
            name: '',
            type: '',
            successMessage: '',
            warningMessage: '',
            errorMessage: ''
        },

        parse: function (response) {
            response.id = response._id;
            return response;
        }

    });

    return File;

});
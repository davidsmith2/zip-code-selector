define([
    'underscore',
    'backbone',
    'config'
],

function (_, Backbone, config) {
    
    var File = Backbone.Model.extend({

        url: '/api/uploads',
        
        defaults: {
            name: '',
            path: '',
            extension: '',
            validExtensions: []
        },

        reset: function () {
            this.set(this.defaults);
        },

        parse: function (response) {
            response.id = response._id;
            return response;
        },

        validate: function (attrs) {
            if (!this.isValidExtension(attrs.validExtensions, attrs.name)) {
                return config.alerts[1];
            }
        },

        isValidExtension: function (validExtensions, name) {
            return _.contains(validExtensions, this.getExtension(name));
        },

        getExtension: function (name) {
            return (name !== '') ? name.split('.').pop().toLowerCase() : '';
        },

        getName: function (path) {
            return path.split('\\').pop();
        }

    });

    return File;

});
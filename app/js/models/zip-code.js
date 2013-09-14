define([
    'underscore',
    'backbone'
],

function (_, Backbone) {
    
    var ZipCode = Backbone.Model.extend({

        defaults: {
            code: '',
            suffix: ''
        }

    });

    return ZipCode;

});
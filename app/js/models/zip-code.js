define([
    'underscore',
    'backbone'
],

function (_, Backbone) {
    
    var ZipCode = Backbone.Model.extend({

        defaults: {
            zip: 00000,
            suffix: 0000
        }

    });

    return ZipCode;

});
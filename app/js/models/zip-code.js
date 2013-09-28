define([
    'underscore',
    'backbone'
],

function (_, Backbone) {
    
    var ZipCode = Backbone.Model.extend({

        defaults: {
            base: '00000',
            addOn: '0000'
        }

    });

    return ZipCode;

});
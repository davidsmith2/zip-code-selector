define([
    'underscore',
    'backbone',
    'models/zip-code'
],

function (_, Backbone, ZipCode) {
    
    var ZipCodes = Backbone.Collection.extend({

        model: ZipCode,
        comparator: function (zipCode) {
            return zipCode.get('base');
        }

    });

    return ZipCodes;

});
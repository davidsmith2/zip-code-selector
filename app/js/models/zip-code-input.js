define([
    'underscore',
    'backbone'
],

function (_, Backbone) {
    
    var ZipCodeInput = Backbone.Model.extend({

        defaults: {
            inputNum: 0
        }

    });

    return ZipCodeInput;

});
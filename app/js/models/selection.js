define([
    'underscore',
    'backbone'
],

function (_, Backbone) {
    
    var Selection = Backbone.Model.extend({

        defaults: {
            zipCodeFile: '',
            zipCodes: []
        },

        addToZipCodes: function (zipCode) {
            this.push('zipCodes', zipCode);
        },

        removeFromZipCodes: function (zipCode) {
            var array = this.get('zipCodes');

            this.set('zipCodes', _.reject(array, function (member) {
                return member === zipCode;
            }));
        },

        push: function (arg, val) {
            var arr = _.clone(this.get(arg));
            arr.push(val);
            this.set(arg, arr);
        }

    });

    return Selection;

});
define([
    'underscore',
    'backbone'
],

function (_, Backbone) {
    
    var Search = Backbone.Model.extend({

        defaults: {
            name: '',
            private: false,
            zipCodeFile: '',
            zipCodes: []
        },

        addToZipCodes: function (zipCode) {
            var array = this.get('zipCodes');

            if (!_.contains(array, zipCode)) {
                this.push('zipCodes', zipCode);
            }
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

    return Search;

});
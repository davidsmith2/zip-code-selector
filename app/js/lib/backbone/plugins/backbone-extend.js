define([
    'underscore',
    'backbone'
],

function (_, Backbone) {

    Backbone.Model.prototype.parse = function (response) {
        response.id = response._id;
        return response;
    };

    Backbone.Model.prototype.reset = function () {
        this.set(this.defaults);
    };

    return Backbone;

});
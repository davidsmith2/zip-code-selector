define([
    'underscore',
    'backbone',
    'models/search'
],

function (_, Backbone, Search) {
    
    var Searches = Backbone.Collection.extend({

        model: Search

    });

    return Searches;

});
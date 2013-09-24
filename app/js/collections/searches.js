define([
    'underscore',
    'backbone',
    'models/search'
],

function (_, Backbone, Search) {
    
    var Searches = Backbone.Collection.extend({

        model: Search,
        url: '/api/searches'

    });

    return Searches;

});
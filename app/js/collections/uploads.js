define([
    'underscore',
    'backbone',
    'models/file'
],

function (_, Backbone, File) {
    
    var Uploads = Backbone.Collection.extend({

        model: File,
        url: '/api/uploads'

    });

    return Uploads;

});
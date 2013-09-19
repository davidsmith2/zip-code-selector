define([
    'underscore',
    'backbone'
],

function (_, Backbone) {
    
    var Modal = Backbone.Model.extend({

        defaults: {
            headerContent: 'Header',
            bodyContent: 'Body',
            footerContent: 'Footer'
        }

    });

    return Modal;

});
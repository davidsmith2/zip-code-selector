define([
    'underscore',
    'backbone'
],

function (_, Backbone) {
    
    var Modal = Backbone.Model.extend({

        defaults: {
            headerContent: '',
            bodyContent: '',
            footerContent: ''
        }

    });

    return Modal;

});
define([
    'underscore',
    'backbone'
],

function (_, Backbone) {
    
    var Modal = Backbone.Model.extend({

        defaults: {
            options: {
                backdrop: true,
                keyboard: true,
                show: true,
                remote: false,
            },
            content: {
                header: '',
                body: '',
                footer: ''
            }
        }

    });

    return Modal;

});
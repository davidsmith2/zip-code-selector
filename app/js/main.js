requirejs.config({
    paths: {
        'jquery':               'lib/jquery-1.9.1',
        'underscore':           'lib/underscore-min',
        'backbone':             'lib/backbone-min',
        'marionette':           'lib/backbone.marionette',
        'bootstrapTransition':  'lib/bootstrap/bootstrap-transition',
        'bootstrapAlert':       'lib/bootstrap/bootstrap-alert',
        'bootstrapModal':       'lib/bootstrap/bootstrap-modal',
        'jqueryForm':           'lib/jquery.form',
        'text':                 'lib/text'
    },
	shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'marionette': {
            deps: ['jquery', 'underscore', 'backbone'],
            exports: 'Marionette'
        },
        'bootstrapTransition': {
            deps: ['jquery']
        },
        'bootstrapAlert': {
            deps: ['jquery']
        },
        'bootstrapModal': {
            deps: ['jquery', 'bootstrapTransition']
        },
        'jqueryForm': {
            deps: ['jquery']
        }
	}
});

require(['app'], function (App) {
    window.mSSS = new App();
});
requirejs.config({
    paths: {
        'jquery':               'lib/jquery-1.9.1',
        'underscore':           'lib/underscore-min',
        'backbone':             'lib/backbone-min',
        'text':                 'lib/text',
        'jqueryForm':           'lib/jquery.form',
        'bootstrapAlert':       'lib/bootstrap/bootstrap-alert',
        'bootstrapModal':       'lib/bootstrap/bootstrap-modal'
    },
	shim: {
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'jqueryForm': {
            deps: ['jquery']
        },
        'bootstrapAlert': {
            deps: ['jquery']
        },
        'bootstrapModal': {
            deps: ['jquery']
        },
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        }
	}
});

require(['app'], function (App) {
    window.mSSS = new App();
});
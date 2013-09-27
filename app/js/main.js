requirejs.config({
    baseUrl: '/js/',
    urlArgs: 'cb=' + Math.random(),
    paths: {
        'jquery':               'lib/jquery/jquery-1.9.1',
        'underscore':           'lib/underscore/underscore-min',
        'backbone':             'lib/backbone/backbone-min',
        'bootstrapTransition':  'lib/bootstrap/bootstrap-transition',
        'bootstrapAlert':       'lib/bootstrap/bootstrap-alert',
        'bootstrapModal':       'lib/bootstrap/bootstrap-modal',
        'jqueryForm':           'lib/jquery/plugins/jquery.form',
        'text':                 'lib/text/text'
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
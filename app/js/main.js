requirejs.config({
    paths: {
        'backbone':             'lib/backbone-min',
        'jquery':               'lib/jquery-1.9.1',
        'jqueryForm':           'lib/jquery.form',
        'text':                 'lib/text',
        'underscore':           'lib/underscore-min'
    },
	shim: {
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'jqueryForm': {
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
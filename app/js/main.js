requirejs.config({
    baseUrl: '/js/',
    paths: {
        'jquery':               'lib/jquery/jquery-1.9.1',
        'underscore':           'lib/underscore/underscore-min',
        'backbone':             'lib/backbone/backbone-min',
        'backbone-extend':      'lib/backbone/plugins/backbone-extend',
        'bootstrap':            'lib/bootstrap/bootstrap',
        'jquery-form':          'lib/jquery/plugins/jquery.form',
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
        'backbone-extend': {
            deps: ['backbone']
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'jquery-form': {
            deps: ['jquery']
        }
	},
    map: {
        '*': {
            'backbone': 'backbone-extend'
        },
        'backbone-extend': {
            'backbone': 'backbone'
        }
    }
});

require(['app'], function (App) {
    window.mSSS = new App();
});
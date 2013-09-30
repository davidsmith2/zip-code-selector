requirejs.config({
    baseUrl: '../js/',
    urlArgs: 'cb=' + Math.random(),
    paths: {
        'jquery':               'lib/jquery/jquery-1.9.1',
        'underscore':           'lib/underscore/underscore-min',
        'backbone':             'lib/backbone/backbone-min',
        'backbone-extend':      'lib/backbone/plugins/backbone-extend',
        'bootstrap-transition': 'lib/bootstrap/bootstrap-transition',
        'bootstrap-alert':      'lib/bootstrap/bootstrap-alert',
        'bootstrap-modal':      'lib/bootstrap/bootstrap-modal',
        'jquery-form':          'lib/jquery/plugins/jquery.form',
        'text':                 'lib/text/text',
        'spec':                 '../test/spec'
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
        'bootstrap-transition': {
            deps: ['jquery']
        },
        'bootstrap-alert': {
            deps: ['jquery']
        },
        'bootstrap-modal': {
            deps: ['jquery', 'bootstrap-transition']
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

require(['jquery'], function ($) {
    console.log($)
});
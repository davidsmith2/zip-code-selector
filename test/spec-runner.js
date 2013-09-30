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
        'jasmine':              '../test/lib/jasmine',
        'jasmine-html':         '../test/lib/jasmine-html',
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
        },
        'jasmine': {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
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

require(['jquery', 'underscore', 'jasmine-html'], function ($, _, jasmine) {

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();
    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };

    var specs = [
        'spec/views/search/geography/zip-codes/upload/input.spec',
        'spec/views/search/geography/zip-codes/upload/form.spec'
    ];

    $(function () {
        require(specs, function () {
            jasmineEnv.execute();
        });
    });

});
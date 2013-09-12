// module dependencies
var applicationRoot = __dirname,
    express = require('express'),
    path = require('path'),
    mongoose = require('mongoose');



// create server

var app = express();



// connect to db and define schema and models

mongoose.connect('mongodb://localhost/mSSS_database');

var File = new mongoose.Schema({
    name: 'string',
    type: 'string',
    successMessage: 'string',
    warningMessage: 'string',
    errorMessage: 'string'
});

var FileModel = mongoose.model('File', File);

// configure server

app.configure(function(){

    // where to serve static content
    app.use(
        express.static(
            path.join(
                applicationRoot, 'app'
            )
        )
    );

    app.use('/js/lib/', express.static('node_modules/requirejs/'));

    app.use('/node_modules', express.static('node_modules'));

    app.use('/test', express.static('test/'));

    app.use('/test', express.static('app'));

    // parses request body and populates request body
    app.use(express.bodyParser({
        keepExtensions: true,
        uploadDir: applicationRoot + '/public/uploads'
    }));

    // checks request body for HTTP method overrides
    app.use(express.methodOverride());

    // perform route lookup based on URL and HTTP method
    app.use(app.router);

    // show all errors in development
    app.use(
        express.errorHandler({
            dumpExceptions: true,
            showStack: true
        })
    );

});



// api

app.get('/api/uploads', function (request, response) {
    return FileModel.find(function (error, files) {
        if (!error) {
            return response.send(files);
        } else {
            return console.log(error);
        }
    });
});

app.post('/api/uploads', uploadFile, addFile);

app['delete']('/api/uploads/:id', function (request, response) {
    return FileModel.findById(request.params.id, function (error, file) {
        return file.remove(function (error) {
            if (!error) {
                console.log('file deleted');
                return response.send('');
            } else {
                console.log(err);
            }
        });
    });
});

// start server

var protocol = 'http',
    hostname = 'localhost',
    port = 4711,
    url,
    message;

url = protocol + '://' + hostname + ':' + port;

message = 'Express server listening on port %d in %s mode. Application running at ' + url + '.';

app.listen(port, function(){
    console.log(message, port, app.settings.env);
});


// private variables and functions

var mimes = [
    'text/csv',
    'text/plain',
    'text/tab-separated-values',
    'application/vnd.ms-excel'
];

var messages = {
    success: 'Success',
    warning: 'Warning',
    error: 'Error'
};

function uploadFile (request, response, next) {
    var file, e;

    if (request.files) {
        file = request.files.file;
        e = request.body;

        e.name = file.name;
        e.type = file.headers['content-type'];
    }

    next();
}

function addFile (request, response) {
    var file, e;

    e = request.body;

    file = new FileModel({
        name: e.name,
        type: e.type
    });


    if (mimes.indexOf(file.get('type')) > -1) {

        file.set('successMessage', messages.success);

    } else {

        file.set('warningMessage', messages.warning);

    }

    file.save(function (error) {
        if (!error) {
            return console.log('file created');
        } else {
            return console.log(error);
        }
    });

    return response.send(file);
}

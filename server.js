// module dependencies
var applicationRoot = __dirname,
    express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    fs = require('fs');

// create server

var app = express();



// connect to db and define schema and models

mongoose.connect('mongodb://localhost/mSSS_database');

var File = new mongoose.Schema({
    name: String
});

var FileModel = mongoose.model('File', File);

var Search = new mongoose.Schema({
    name: String,
    _private: Boolean,
    zipCodeFile: String,
    zipCodes: Array
});

var SearchModel = mongoose.model('Search', Search);



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



// apis

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

app.get('/api/searches', function (request, response) {
    return SearchModel.find(function (error, searches) {
        if (!error) {
            return response.send(searches);
        } else {
            return console.log(error);
        }
    });
});

app.post('/api/searches', function (request, response) {
    var search = new SearchModel({
        name: request.body.name,
        _private: request.body._private,
        zipCodeFile: request.body.zipCodeFile,
        zipCodes: request.body.zipCodes
    });
    search.save(function (error) {
        if (!error) {
            return console.log('search created');
        } else {
            return console.log(error);
        }
    });
    return response.send(search);
});

app.put('/api/searches/:id', function (request, response) {
    return SearchModel.findById(request.params.id, function (error, search) {
        search.name = request.body.name;
        search._private = request.body._private;
        search.zipCodeFile = request.body.zipCodeFile;
        search.zipCodes = request.body.zipCodes;
        return search.save(function (error) {
            if (!error) {
                console.log('search updated');
            } else {
                console.log(error);
            }
            return response.send(search);
        });
    });
});

app['delete']('/api/searches/:id', function (request, response) {
    return SearchModel.findById(request.params.id, function (error, search) {
        return search.remove(function (error) {
            if (!error) {
                console.log('search deleted');
                return response.send('');
            } else {
                console.log(error);
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
    success: function (numZipCodes, fileName) {
        return numZipCodes + ' zip codes from zip code file ' + fileName + ' were successfully loaded.'
    },
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
        e.path = file.path;
    }

    next();
}

function addFile (request, response) {
    var responseObj = {},
        file, fileName, fileType, filePath, e;

    e = request.body;

    fileName = e.name;
    fileType = e.type;
    filePath = e.path;

    responseObj.fileName = fileName;

    if (mimes.indexOf(fileType > -1)) {

        fs.readFile(filePath, function (error, data) {
            var zipCodes = [],
                numZipCodes = 0;

            if (!error) {
                zipCodes = data.toString().split('\n');
                numZipCodes = zipCodes.length;
                responseObj.zipCodes = zipCodes;
                responseObj.successMessage = messages.success(numZipCodes, fileName);
            } else {
                responseObj.errorMessage = messages.error;
            }
            return response.send(responseObj);
        });

    } else {
        console.log('invalid file type');
    }

}

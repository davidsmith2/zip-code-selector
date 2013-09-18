define([
],

function () {

    return {

        students: [
            {
                name: 'Andy',
                zipCode: '22201'
            },
            {
                name: 'Bill',
                zipCode: '22202'
            },
            {
                name: 'Charlie',
                zipCode: '22203'
            },
            {
                name: 'Dave',
                zipCode: '22204'
            },
            {
                name: 'Ethan',
                zipCode: '22205'
            },
            {
                name: 'Fred',
                zipCode: '22206'
            },
            {
                name: 'George',
                zipCode: '22207'
            },
            {
                name: 'Harry',
                zipCode: '22208'
            },
            {
                name: 'Ian',
                zipCode: '22209'
            },
            {
                name: 'Jason',
                zipCode: '22210'
            }
        ],

        alerts: [
            {
                type: 'error',
                message: 'File not selected'
            },
            {
                type: 'error',
                message: 'Invalid file type'
            },
            {
                type: 'success',
                message: 'File uploaded'
            },
            {
                type: 'warning',
                message: 'Uploaded file warning'
            },
            {
                type: 'error',
                message: 'Uploaded file error'
            }
        ],

        upload: {},

        manual: {
            inputsPerRow: 5,
            minInputs: 15,
            maxInputs: 50,
            addRows: 1
        }

    };
    
});
define([
],

function () {

    var maxInputs = 50;

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
                connotation: 'error',
                content: 'File not selected'
            },
            {
                connotation: 'error',
                content: 'Invalid file type'
            },
            {
                connotation: 'success',
                content: 'File uploaded'
            },
            {
                connotation: 'warning',
                content: 'Uploaded file warning'
            },
            {
                connotation: 'error',
                content: 'Uploaded file error'
            },
            {
                connotation: 'warning',
                content: 'You have reached the maximum of ' + maxInputs + ' ZIP code fields. Use the ZIP loader to add more.'
            }
        ],

        upload: {},

        manual: {
            inputsPerRow: 5,
            minInputs: 15,
            maxInputs: maxInputs,
            addRows: 1
        }

    };
    
});
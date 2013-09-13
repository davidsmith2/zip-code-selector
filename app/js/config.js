define([
],

function () {

    return {

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
                type: 'error',
                message: 'Error relating to uploaded file'
            },
            {
                type: 'warning',
                message: 'Warning relating to uploaded file'
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
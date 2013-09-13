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
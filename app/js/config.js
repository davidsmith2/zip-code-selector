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

        modals: [
            {
                header: '<h3>ZIP Loader Tips</h3>',
                body: '<ul><li>You can upload as many as 4,000 two-, three-, or five-digit ZIP codes in one file.</li></ul>',
                footer: '<a href="#" class="btn modal-cancel">Close</a>'
            }
        ],

        upload: {},

        manual: {
            inputsPerRow: 5,
            minInputs: 15,
            maxInputs: maxInputs,
            addRows: 1,
            noFileChosen: 'Select file'
        }

    };
    
});
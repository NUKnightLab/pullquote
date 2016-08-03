loadMethods = (function() {
    
    var shell = require('shelljs'),
        lodash = require('lodash-cli'),

        methodString = "",
        // add lodash methods used here //
        methods = [ 'assign',
                    'forEach'
                  ],
        outputFile = './src/js/lib/lodash.js';

    methods.forEach(function(method) {
        methodString += "," + method;
    })

    lodashCommand = 'lodash -d -o ' + outputFile + ' include=' + methodString

    shell.exec(lodashCommand, function() {
        console.log("Compiling lodash methods...")
    }); 
})();


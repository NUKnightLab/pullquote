loadMethods = (function() {
    
    var shell = require('shelljs'),
        lodash = require('lodash-cli');

    shell.exec('lodash -d -o ./src/js/lib/lodash.js include=assign,forEach', function() {
        console.log("Compiling lodash methods...")
    }); 
})();


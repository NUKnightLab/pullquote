var cssmin = require('cssmin'),
    fs = require('fs-extra'),
    css = fs.readFileSync("dist/css/base.css", 'utf8'),
    min = cssmin(css);

fs.outputFileSync('dist/css/base.min.css', min, 'utf8');

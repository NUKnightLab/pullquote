'use strict'
var fs = require('fs-extra'),
    dotenv = require('dotenv');

fs.createReadStream('.sample-env')
  .pipe(fs.createWriteStream('.env'))

dotenv.load();

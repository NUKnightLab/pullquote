require('dotenv').config({silent: true});

var _ = require("../src/js/lib/lodash.js"),
    fm = require('front-matter'),
    fs = require('fs-extra'),
    path = require('path'),
    Handlebars = require('handlebars'),
    globby = require('globby'),
    shell = require('shelljs');

function renderTemplate(templatePath) {
  var file = fs.readFileSync(templatePath, 'utf8'),
      frontMatter = fm(file),
      context = frontMatter.attributes,
      template = Handlebars.compile(frontMatter.body);

  context['pullquoteURL'] = process.env.PULLQUOTE_URL || 'http://localhost:8080/';
  return template(context);
}

function renderPage(template, layout) {
  var file = fs.readFileSync(layout, 'utf8'),
      context = {body: template},
      page = Handlebars.compile(file);

  return page(context);
}

function build() {

  var globby = require('globby'),
      _ = require('../src/js/lib/lodash.js');

  var hbsTemplates = globby.sync('src/templates/*');

  //register helper
  Handlebars.registerHelper('raw-helper', function(options) {
      return options.fn();
  });

  _.forEach(hbsTemplates, function(file, i) {
      filePattern = file.split('src/templates/')[1];
      //check if filePattern is not in a dir like reusable template
      if(filePattern.includes('.hbs')) {
          fileName = path.basename(file, '.hbs'),
          template = renderTemplate(file),
          page = renderPage(template, 'src/templates/layouts/default.hbs');

          fs.outputFileSync(`dist/${fileName}.html`, page, 'utf8');
      } else {
          if(file.split(path.dirname(file))[1].includes('reusable-templates')) {
              var fileThing = globby.sync('src/templates/reusable-templates/*.hbs')
              fs.copy(fileThing[0], "dist/templates/template.html", false)
          }
      }
  });

}

build();

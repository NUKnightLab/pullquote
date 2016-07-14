var _ = require('lodash'),
    fm = require('front-matter'),
    fs = require('fs-extra'),
    path = require('path'),
    Handlebars = require('handlebars'),
    globby = require('globby');

function renderTemplate(templatePath) {
  var file = fs.readFileSync(templatePath, 'utf8'),
      frontMatter = fm(file),
      context = frontMatter.attributes,
      template = Handlebars.compile(frontMatter.body);

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
      _ = require('lodash');

  var hbsTemplates = globby.sync('src/templates/*.hbs');

  _.forEach(hbsTemplates, function(file, i) {
    var filePattern = path.dirname(file).split('src/templates/')[1],
        fileName = path.basename(file, '.hbs'),
        template = renderTemplate(file);
        
        page = renderPage(template, 'src/templates/layouts/default.hbs');

    fs.outputFileSync(`dist/${fileName}.html`, page, 'utf8');
  });

}

build();

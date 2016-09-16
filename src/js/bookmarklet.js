/**
  Pullquote Bookmarklet
*/
function iFrame(apiRoot) {
    var Handlebars = require('handlebars');

    function init(apiRoot) {
        text = grabTextSelection();
        image = grabOgImage();
        cite = grabCitation();
        url = composeURL(text, image, cite)

        loadTemplate(url);

        return false;
    }

    function loadTemplate(url) {
        bookMarklet = document.createElement('div');
        bookMarklet.id = 'bookMarklet';

        bookMarklet.setAttribute('data-template', 'pq-iframe-template')

        //load template into div
        var template = document.getElementById('pq-iframe-template').innerHTML;
        var output = Handlebars.compile(template);
        var context = {url: url}
        bookMarklet.innerHTML = output(context);

        document.body.appendChild(bookMarklet);
    }

    function grabTextSelection() {
        var text = "";
        text = window.getSelection().toString();

        return text;
    }

    function grabOgImage() {
        if(!!document.querySelectorAll("meta[property='og:image']").length) {
            var image = document.querySelectorAll("meta[property='og:image']")[0].content;

            return image;
        } else {
          return image = "https://placekitten.com/500/300"
        }
    }

    function grabCitation(){
      var cite = document.domain;
      if (cite.indexOf('www.') == 0) {
          cite = cite.slice(4);
      }
      return cite;
    }

    function composeURL(quote, image, cite) {
      //compositions.html?quote=whatever quote&image=assets/placeholder.jpg&cite=publication name
        var url,
            q = "quote=" + quote,
            i = "image=" + image,
            c = "cite=" + cite;

        url = apiRoot + "compositions.html?" + q + "&" + i + "&" + c;

        return url;
    }

    function closeiFrame() {
        document.body.removeChild(bookMarklet)
    }

    return {
        init: init,
        closeiFrame: closeiFrame
    }
}

module.exports = {
    iFrame: iFrame
}


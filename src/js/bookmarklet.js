/**
  Pullquote Bookmarklet
*/
function iFrame() {

    function init() {
        event.preventDefault();
        text = grabTextSelection();
        image = grabOgImage();
        url = composeURL(text, image, "publication name")
        bookMarklet = document.createElement('div');
        bookMarklet.className = 'bookMarklet';
        bookMarklet.innerHTML = "<button class='closeButton' onClick='bookmarklet.iFrame().closeiFrame()'></button><iframe src='" + url + "'></iframe><div class='backdrop'></div>";

        document.body.appendChild(bookMarklet);

        return false;
    }

    function grabTextSelection() {
      var text = "";
      text = window.getSelection().toString();

      return text;
    }

    function grabOgImage() {
      var image = document.querySelectorAll("meta[property='og:image']")[0].content;

      return image;
    }

    function composeURL(quote, image, cite) {
      //compositions.html?quote=whatever quote&image=assets/placeholder.jpg&cite=publication name
      var url,
          q = "quote=" + quote,
          i = "image=" + image,
          c = "cite=" + cite;

      url = "compositions.html?" + q + "&" + i + "&" + c;

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
    iFrame
}


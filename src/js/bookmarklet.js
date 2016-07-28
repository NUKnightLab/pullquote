/**
  Pullquote Bookmarklet
*/
function iFrame() {

    function init() {
        text = grabTextSelection();
        image = grabOgImage();
        url = composeURL(text, image, "publication name")
        bookMarklet = document.createElement('div');
        bookMarklet.className = 'bookMarklet';
        bookMarklet.innerHTML = "<button class='closeButton' onClick='bookmarklet.iFrame().closeiFrame()'></button><iframe class='pq--iframe' src='" + url + "'></iframe><div class='backdrop'></div>";

        document.body.appendChild(bookMarklet);
        //preventPageScroll();

        return false;
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
          return image = "http://placekitten.com/500/300"
        }
    }

    function composeURL(quote, image, cite) {
      //compositions.html?quote=whatever quote&image=assets/placeholder.jpg&cite=publication name
        var url,
            q = "quote=" + quote,
            i = "image=" + image,
            c = "cite=" + cite;

        url = "http://localhost:8080/compositions.html?" + q + "&" + i + "&" + c;

        return url;
    }

    function preventPageScroll() {
        var body = document.getElementsByTagName('body');
        document.body.style.position = "fixed";
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


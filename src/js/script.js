function iFrame() {
  var iframe, closeButton, backDrop

  function init() {
    console.log("hello");
    bookMarklet = document.createElement('div');
    bookMarklet.className = 'bookMarklet';
    //bookMarklet.innerHTML = "<button class='closeButton' onclick='iFrame().closeiFrame()'></button><iframe src='compositions.html?quote=whatever quote&image=http://linktoimage&cite=publication name'></iframe><div class='backdrop'></div>"

    document.body.appendChild(bookMarklet);

    var event = new CustomEvent("keydown");
    window.addEventListener("keydown", function() {
      event.stopPropagation();
    }, false)

    window.onkeypress = window.dispatchEvent(event);
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

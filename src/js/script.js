function iFrame() {
  var iframe, closeButton, backDrop

  function init() {
    event.preventDefault();
    bookMarklet = document.createElement('div');
    bookMarklet.className = 'bookMarklet';
    bookMarklet.innerHTML = "<button class='closeButton' onClick='script.iFrame().closeiFrame()'></button><iframe src=''></iframe><div class='backdrop'></div>"

    document.body.appendChild(bookMarklet);

    return false;

    //var event = new CustomEvent("keydown");
    //window.addEventListener("keydown", function() {
    //  event.stopPropagation();
    //}, false)

    //window.onkeypress = window.dispatchEvent(event);
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

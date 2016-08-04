/**
  Pullquote
*/

// Knight Lab Namespace
KL = {};

KL.Browser = require("core/KL.Browser");
KL.DomEvent = require("dom/KL.DomEvent");
KL.Data = require("data/KL.Data");
KL.QuoteComposition = require("quote/KL.QuoteComposition");
KL.Helper = require("helpers/KL.Helper");

_ = require("lib/lodash.js");

KL.Pullquote = (function() {

    var el = {
        container: document.getElementById("pullquote-container"),
        container_content: {},
        },
        quote_compositions = [];

    /**
     * _getURLVars: Parses a given url string and grabs the variables passed into the url
     *
     * @param string urlString
     * @returns object urlVars
     */
    _getURLVars = function(string) {
      var urlVars = {},
          str = string.toString();

      if(string.match('&#038;') || (string.match('&amp'))) {
        var match = string.match('&#038') || string.match('&amp');
        str = string.replace(match, '&');
      }

      urlVarArray = str.split('?')[1].split('&');

      for(var i = 0; i < urlVarArray.length; i++) {
        urlKey = urlVarArray[i].split('=')[0];
        urlVal = urlVarArray[i].replace(/([^=]*)./, '')
        urlVars[urlKey] = urlVal;
      }

      return urlVars;
    }

    /**
     * createComposition: composes the layout for image and quote and appends it to the container element 
     *
     * @param String urlData
     * @param Boolean anchor
     * @param Boolean use_image
     * @returns {undefined}
     */
    _createComposition = function(data, anchor, use_image) {
        //grab quotes
        var composition = KL.QuoteComposition().createPullquoteComposition(data, anchor, use_image);

        el.container_content.appendChild(composition.container);
        quote_compositions.push(composition);
    };

    /**
     * _init: creates the composition for pullquote
     *
     * @returns {undefined}
     */
    _init = function() {
        urlVars = _getURLVars(window.location.href);

        // LAYOUT
        el.container.innerHTML = "";
        el.container_content = KL.Helper.create('div', 'editor-content', el.container);

        // Create Content
        urlVars = KL.QuoteComposition().createPullquoteContent(urlVars);

        // Create Pullquote Composition
        _createComposition(urlVars, false, true);
        _createComposition(urlVars, "left", true);
        _createComposition(urlVars, "right", true);
        _createComposition(urlVars, false, false);
    }();

})();

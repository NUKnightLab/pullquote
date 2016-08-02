/**
  Pullquote
*/

// Knight Lab Namespace
KL = {};

/*	Required Files
    Webpack
    https://webpack.github.io/
================================================== */

KL.Browser = require("core/KL.Browser");
KL.DomEvent = require("dom/KL.DomEvent");
KL.Data = require("data/KL.Data");
KL.QuoteComposition = require("quote/KL.QuoteComposition");
KL.Helper = require("helpers/KL.Helper");

_ = require("lib/lodash.js");

KL.Pullquote = (function() {

    // DOM ELEMENTS
    var el = {
        container: document.getElementById("pullquote-container"),
        container_content: {},
        },
        quote_compositions = [];

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

    // LOAD EXAMPLE QUOTES
    _load_quotes = function() {
        urlVars = _getURLVars(window.location.href);

        // LAYOUT
        el.container.innerHTML = "";
        el.container_content = KL.Helper.create('div', 'editor-content', el.container);

        // Create Quotes
        createComposition(urlVars, false, true);
        createComposition(urlVars, "left", true);
        createComposition(urlVars, "right", true);
        createComposition(urlVars, false, false);
    };

    createComposition = function(urlData, anchor, use_image) {
        //grab quotes
        var composition = KL.QuoteComposition().createComposition(urlVars, anchor, use_image);

        el.container_content.appendChild(composition.container);
        quote_compositions.push(composition);
    };

    /*	INIT
    ================================================== */
    _load_quotes();

})();
